const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

class SFXGenerator {
  constructor(outputDir) {
    this.outputDir = outputDir;
  }

  ensureDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  runFFmpeg(args, filename) {
    const dest = path.join(this.outputDir, filename);
    const fullArgs = ['-y', ...args, dest];
    const res = spawnSync('ffmpeg', fullArgs, { stdio: 'pipe' });
    if (res.status === 0) {
      console.log(`[SFXGenerator] Generated: ${filename}`);
      return dest;
    } else {
      console.error(`[SFXGenerator] Failed ${filename}:`, res.stderr ? res.stderr.toString() : 'Unknown error');
      return null;
    }
  }

  generateClockTick60() {
    // 60 BPM (1 tick per second): a 10s track with hollow mechanical clicks every 1s
    // Synthesized using an exponential decaying burst of bandpassed noise at 1.8kHz and 800Hz
    const filter = [
      'aevalsrc=sin(2*PI*1200*t)*exp(-35*(t-trunc(t))) + sin(2*PI*650*t)*exp(-50*(t-trunc(t))):s=44100:d=10',
      'lowpass=f=2500,highpass=f=400',
      'volume=0.85'
    ].join(',');
    return this.runFFmpeg(['-f', 'lavfi', '-i', filter], 'sfx_clock_tick_60bpm.wav');
  }

  generateClockTick120() {
    // 120 BPM (2 ticks per second): a 6s track with faster clicks
    const filter = [
      'aevalsrc=sin(2*PI*1400*t)*exp(-50*(2*t-trunc(2*t))) + sin(2*PI*750*t)*exp(-70*(2*t-trunc(2*t))):s=44100:d=6',
      'lowpass=f=2800,highpass=f=450',
      'volume=0.85'
    ].join(',');
    return this.runFFmpeg(['-f', 'lavfi', '-i', filter], 'sfx_clock_tick_120bpm.wav');
  }

  generateSubBassDrone() {
    // 45 Hz fundamental with 90 Hz second harmonic, subtle 0.1Hz LFO amplitude swell, 15s
    const filter = [
      'aevalsrc=(sin(2*PI*45*t) + 0.35*sin(2*PI*90*t))*(0.75 + 0.25*sin(2*PI*0.12*t)):s=44100:d=15',
      'lowpass=f=110',
      'volume=0.9'
    ].join(',');
    return this.runFFmpeg(['-f', 'lavfi', '-i', filter], 'sfx_sub_bass_drone_45hz.wav');
  }

  generatePhoneBuzz() {
    // Two rapid vibration bursts on wood (165 Hz modulated square-like tone with rattle)
    const filter = [
      'aevalsrc=\'sin(2*PI*165*t)*gte(mod(t,0.5),0.1)*lte(mod(t,0.5),0.4)\':s=44100:d=1.5',
      'lowpass=f=500',
      'aecho=0.8:0.6:20:0.3',
      'volume=0.9'
    ].join(',');
    return this.runFFmpeg(['-f', 'lavfi', '-i', filter], 'foley_phone_buzz.wav');
  }

  generateScreenTap() {
    // Crisp high-frequency glass tap with quick 25ms decay
    const filter = [
      'aevalsrc=(sin(2*PI*3200*t)*exp(-120*t) + sin(2*PI*1800*t)*exp(-160*t)):s=44100:d=0.2',
      'highpass=f=1200',
      'volume=0.95'
    ].join(',');
    return this.runFFmpeg(['-f', 'lavfi', '-i', filter], 'foley_screen_tap.wav');
  }

  generateBedCreak() {
    // Wood & spring tension creak: low squeak bending pitch down
    const filter = [
      'aevalsrc=\'sin(2*PI*(380-120*t)*t)*exp(-3.5*t)*gte(t,0.05)*lte(t,0.7)\':s=44100:d=1.0',
      'bandpass=f=320:width_type=h:w=200',
      'aecho=0.8:0.5:40:0.2',
      'volume=0.8'
    ].join(',');
    return this.runFFmpeg(['-f', 'lavfi', '-i', filter], 'foley_bed_creak.wav');
  }

  generateSheetsRustle() {
    // Soft fabric / blanket friction: shaped filtered noise
    const filter = [
      'anoisesrc=d=1.8:c=pink:r=44100:a=0.5',
      'bandpass=f=1400:width_type=h:w=1200',
      'afade=t=in:ss=0:d=0.4,afade=t=out:st=1.1:d=0.7',
      'volume=0.75'
    ].join(',');
    return this.runFFmpeg(['-f', 'lavfi', '-i', filter], 'foley_sheets_rustle.wav');
  }

  generateFootstepWood() {
    // Dull muted wooden floor impact: low thump with subtle wooden body ring
    const filter = [
      'aevalsrc=(sin(2*PI*85*t)*exp(-30*t) + sin(2*PI*210*t)*exp(-45*t)):s=44100:d=0.4',
      'lowpass=f=400',
      'volume=0.9'
    ].join(',');
    return this.runFFmpeg(['-f', 'lavfi', '-i', filter], 'foley_footstep_wood.wav');
  }

  generateDoorCreak() {
    // Slow atmospheric wooden door creak
    const filter = [
      'aevalsrc=\'sin(2*PI*(240+80*sin(2*PI*6*t))*t)*gte(t,0.1)*lte(t,1.4)*exp(-0.8*t)\':s=44100:d=1.6',
      'bandpass=f=280:width_type=h:w=180',
      'aecho=0.8:0.7:50:0.25',
      'volume=0.7'
    ].join(',');
    return this.runFFmpeg(['-f', 'lavfi', '-i', filter], 'foley_door_creak.wav');
  }

  generateDoorLatch() {
    // Solid mechanical door latch click
    const filter = [
      'aevalsrc=(sin(2*PI*950*t)*exp(-90*t) + sin(2*PI*350*t)*exp(-60*t)):s=44100:d=0.3',
      'bandpass=f=600:width_type=h:w=500',
      'volume=0.85'
    ].join(',');
    return this.runFFmpeg(['-f', 'lavfi', '-i', filter], 'foley_door_latch.wav');
  }

  generateWindowSlide() {
    // Smooth window sash slide with subtle airy whoosh
    const filter = [
      'anoisesrc=d=1.5:c=white:r=44100:a=0.3',
      'bandpass=f=900:width_type=h:w=600',
      'afade=t=in:ss=0:d=0.5,afade=t=out:st=0.8:d=0.7',
      'volume=0.7'
    ].join(',');
    return this.runFFmpeg(['-f', 'lavfi', '-i', filter], 'foley_window_slide.wav');
  }

  generateRoomToneNight() {
    // 20s seamless midnight room tone: heavily lowpassed pink air + subtle 50Hz hum
    const filter = [
      'anoisesrc=d=20:c=pink:r=44100:a=0.15',
      'lowpass=f=280',
      'volume=0.6'
    ].join(',');
    return this.runFFmpeg(['-f', 'lavfi', '-i', filter], 'amb_room_tone_night.wav');
  }

  generateMorningBirds() {
    // Soft distant morning birdsong chirps
    const filter = [
      'aevalsrc=\'sin(2*PI*(2800+600*sin(2*PI*18*t))*t)*gte(mod(t,1.3),0.1)*lte(mod(t,1.3),0.35)*0.4\':s=44100:d=4.5',
      'highpass=f=2000',
      'aecho=0.8:0.8:100:0.4',
      'volume=0.65'
    ].join(',');
    return this.runFFmpeg(['-f', 'lavfi', '-i', filter], 'amb_morning_birds.wav');
  }

  generateWarmDawnPad() {
    // Ethereal warm dawn ambient synth chord (Fmaj7 / Cmaj9 chord: C4, E4, G4, B4, D5)
    // with 3s smooth swell and rich release
    const filter = [
      'aevalsrc=(sin(2*PI*261.63*t) + 0.8*sin(2*PI*329.63*t) + 0.7*sin(2*PI*392.00*t) + 0.6*sin(2*PI*493.88*t) + 0.5*sin(2*PI*587.33*t)):s=44100:d=12',
      'lowpass=f=950',
      'afade=t=in:ss=0:d=3.0,afade=t=out:st=8.5:d=3.5',
      'aecho=0.8:0.7:120:0.35',
      'volume=0.75'
    ].join(',');
    return this.runFFmpeg(['-f', 'lavfi', '-i', filter], 'amb_warm_dawn_pad.wav');
  }

  generateDigitalAlarmBeep() {
    // Soft 3-pulse bedside digital clock alarm beep
    const filter = [
      'aevalsrc=\'sin(2*PI*1800*t)*gte(mod(t,0.25),0.05)*lte(mod(t,0.25),0.18)*lte(t,0.8)\':s=44100:d=1.0',
      'volume=0.7'
    ].join(',');
    return this.runFFmpeg(['-f', 'lavfi', '-i', filter], 'sfx_digital_alarm_beep.wav');
  }

  generateAll() {
    this.ensureDir();
    console.log(`[SFXGenerator] Generating full CC0 / Royalty-Free Foley & Audio Pack in ${this.outputDir}...`);
    const results = {
      clockTick60: this.generateClockTick60(),
      clockTick120: this.generateClockTick120(),
      subBassDrone: this.generateSubBassDrone(),
      phoneBuzz: this.generatePhoneBuzz(),
      screenTap: this.generateScreenTap(),
      bedCreak: this.generateBedCreak(),
      sheetsRustle: this.generateSheetsRustle(),
      footstepWood: this.generateFootstepWood(),
      doorCreak: this.generateDoorCreak(),
      doorLatch: this.generateDoorLatch(),
      windowSlide: this.generateWindowSlide(),
      roomToneNight: this.generateRoomToneNight(),
      morningBirds: this.generateMorningBirds(),
      warmDawnPad: this.generateWarmDawnPad(),
      digitalAlarmBeep: this.generateDigitalAlarmBeep()
    };

    const count = Object.values(results).filter(Boolean).length;
    console.log(`[SFXGenerator] Successfully generated ${count}/15 audio assets.`);
    return results;
  }
}

module.exports = SFXGenerator;

if (require.main === module) {
  const targetDir = process.argv[2] || path.join(__dirname, '..', 'projects', 'sample-project', 'input', 'assets', 'audio', 'sfx');
  const generator = new SFXGenerator(targetDir);
  generator.generateAll();
}
