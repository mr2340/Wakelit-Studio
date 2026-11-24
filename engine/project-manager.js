const fs = require('fs');
const path = require('path');
const { program } = require('commander');

const ProjectReader = require('./project-reader');
const ScenePlanner = require('./scene-planner');
const FlowRunner = require('./flow-runner');
const VideoEditor = require('./video-editor');
const QualityChecker = require('./quality-checker');

program
  .name('studio')
  .description('GHD Automated AI Video Production Studio Engine')
  .version('1.0.0');

program
  .command('plan [project]')
  .description('Analyze brief, references and voiceovers to plan scenes and editing plan')
  .action(async (project = 'sample-project') => {
    const planner = new ScenePlanner(project);
    await planner.planProject();
  });

program
  .command('login [project]')
  .description('Launch persistent Chrome browser for manual Google Flow authentication')
  .action(async (project = 'sample-project') => {
    const runner = new FlowRunner(project);
    await runner.runLogin();
  });

program
  .command('batch [project]')
  .description('Execute batch generation of all pending scenes in Google Flow')
  .action(async (project = 'sample-project') => {
    const runner = new FlowRunner(project);
    await runner.runBatch();
  });

program
  .command('edit [project]')
  .description('Assemble generated scenes, mix audio, insert black screens and render final video')
  .action(async (project = 'sample-project') => {
    const editor = new VideoEditor(project);
    await editor.assembleVideo();
  });

program
  .command('check [project]')
  .description('Run quality control inspection on generated scenes and final video')
  .action(async (project = 'sample-project') => {
    const checker = new QualityChecker(project);
    await checker.runInspection();
  });

program
  .command('status [project]')
  .description('Display the current status and scene queue for a project')
  .action((project = 'sample-project') => {
    const reader = new ProjectReader(project);
    const scenes = reader.readScenes();
    console.log(`\n=== PROJECT STATUS: ${project} ===`);
    console.log(`Total scenes: ${scenes.length}`);
    scenes.forEach((s, idx) => {
      console.log(`[${idx + 1}] ${s.id} | ${s.status.toUpperCase()} | ${s.duration}s | ${s.type || 'visual'} | ${s.filename}`);
    });
    console.log('=================================\n');
  });

program
  .command('run [project]')
  .description('Run complete end-to-end studio pipeline')
  .action(async (project = 'sample-project') => {
    console.log(`\n🎬 Starting complete studio pipeline for: ${project}\n`);
    const planner = new ScenePlanner(project);
    await planner.planProject();

    const runner = new FlowRunner(project);
    await runner.runBatch();

    const editor = new VideoEditor(project);
    await editor.assembleVideo();

    const checker = new QualityChecker(project);
    await checker.runInspection();

    console.log(`\n🎉 Studio pipeline execution complete for: ${project}!\n`);
  });

program.parse(process.argv);
