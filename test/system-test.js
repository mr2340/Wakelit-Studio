const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ProjectReader = require('../engine/project-reader');
const ScenePlanner = require('../engine/scene-planner');
const PromptBuilder = require('../engine/prompt-builder');
const DownloadManager = require('../engine/download-manager');
const VideoEditor = require('../engine/video-editor');
const QualityChecker = require('../engine/quality-checker');

async function runTests() {
  console.log('========================================================');
  console.log('RUNNING GHD AUTOMATED STUDIO SYSTEM VERIFICATION TEST');
  console.log('========================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}`);
      failed++;
    }
  }

  const testProject = 'sample-project';
  const reader = new ProjectReader(testProject);
  reader.ensureProjectStructure();

  // Test 1: Project Reader & Directory Structure
  console.log('\n--- Test 1: Project Directory Structure & Reader ---');
  const paths = reader.getPaths();
  assert(fs.existsSync(paths.input), 'Input directory exists');
  assert(fs.existsSync(paths.planning), 'Planning directory exists');
  assert(fs.existsSync(paths.generatedScenes), 'Generated scenes directory exists');
  assert(fs.existsSync(paths.output), 'Output directory exists');

  // Test 2: Scene Planner & Prompt Generation
  console.log('\n--- Test 2: Scene Planner & Prompt Generation ---');
  const planner = new ScenePlanner(testProject);
  const planResult = await planner.planProject();
  assert(planResult.scenes.length === 5, 'Generated 5 initial scenes');
  assert(fs.existsSync(paths.scenes), 'scenes.json written to disk');
  assert(fs.existsSync(paths.editingPlan), 'editing-plan.json written to disk');

  const scenes = reader.readScenes();
  const scene1 = scenes.find(s => s.id === 'scene_001');
  assert(scene1 && scene1.prompt.length > 50, 'Scene 001 prompt successfully built');
  const scene3 = scenes.find(s => s.id === 'scene_003');
  assert(scene3 && scene3.type === 'black_screen', 'Scene 003 correctly identified as black screen');

  // Test 3: Download Manager
  console.log('\n--- Test 3: Download Manager ---');
  const dm = new DownloadManager();
  const dummyFile = path.join(paths.logs, 'test_dummy.txt');
  fs.writeFileSync(dummyFile, 'Test payload');
  assert(fs.existsSync(dummyFile), 'Dummy file written');

  // Test 4: FFmpeg Black Screen Generation & Video Normalization
  console.log('\n--- Test 4: FFmpeg Video Engine Validation ---');
  const editor = new VideoEditor(testProject);
  const testClip1 = path.join(paths.generatedScenes, 'scene_001.mp4');
  const testClip2 = path.join(paths.generatedScenes, 'scene_002.mp4');
  const testClip4 = path.join(paths.generatedScenes, 'scene_004.mp4');
  const testClip5 = path.join(paths.generatedScenes, 'scene_005.mp4');

  console.log('Generating synthetic 2-second mock clips to test editing & assembly...');
  await editor.generateBlackScreenClip(testClip1, 2);
  await editor.generateBlackScreenClip(testClip2, 2);
  await editor.generateBlackScreenClip(testClip4, 2);
  await editor.generateBlackScreenClip(testClip5, 2);

  assert(fs.existsSync(testClip1), 'Synthetic scene_001.mp4 generated');
  assert(fs.existsSync(testClip2), 'Synthetic scene_002.mp4 generated');
  assert(fs.existsSync(testClip4), 'Synthetic scene_004.mp4 generated');
  assert(fs.existsSync(testClip5), 'Synthetic scene_005.mp4 generated');

  // Test 5: Full Video Assembly
  console.log('\n--- Test 5: Video Assembly & Rendering ---');
  // Explicitly set totalDurationSeconds to match synthetic 11s mock test assembly
  const testPlan = reader.readEditingPlan();
  if (testPlan) {
    testPlan.totalDurationSeconds = 11;
    reader.writeEditingPlan(testPlan);
  }
  const finalVideo = await editor.assembleVideo();
  assert(fs.existsSync(finalVideo), 'Final assembled video exists');
  const finalStats = fs.statSync(finalVideo);
  assert(finalStats.size > 10000, `Final video size is valid (${finalStats.size} bytes)`);

  // Test 6: Quality Checker & FFprobe Inspection
  console.log('\n--- Test 6: Quality Checker & Media Inspection ---');
  const checker = new QualityChecker(testProject);
  const qcReport = await checker.runInspection();
  assert(qcReport.finalVideo.exists === true, 'QC detected final video');
  assert(qcReport.finalVideo.hasAudio === true, 'QC confirmed audio presence');
  assert(qcReport.finalVideo.durationCompliant === true, `QC duration validation passed (${qcReport.finalVideo.durationSeconds}s matches expected ${qcReport.finalVideo.expectedDurationSeconds}s)`);
  assert(qcReport.technicalPass === true, 'QC overall technical pass achieved');
  assert(fs.existsSync(path.join(paths.output, 'qc-report.json')), 'QC JSON report saved');
  assert(fs.existsSync(path.join(paths.output, 'qc-report.md')), 'QC Markdown report saved');

  // Test 6b: Duration Gate Rejection (Simulate 42-minute export failure)
  console.log('\n--- Test 6b: Duration QC Gate Defect Detection (42-minute export prevention) ---');
  const dummy42MinProbe = {
    format: { duration: '2520.000000' }, // 42 minutes = 2520 seconds
    streams: [
      { codec_type: 'video', width: 1920, height: 1080, r_frame_rate: '30/1' },
      { codec_type: 'audio', codec_name: 'aac' }
    ]
  };
  const originalProbe = checker.probeMedia;
  checker.probeMedia = () => dummy42MinProbe;
  const failingReport = await checker.runInspection();
  checker.probeMedia = originalProbe;
  assert(failingReport.finalVideo.durationCompliant === false, 'Duration gate successfully rejected 42-minute video');
  assert(failingReport.technicalPass === false, 'QC correctly failed technicalPass on duration violation');
  assert(failingReport.finalVideo.issues.some(i => i.includes('DURATION_GATE_FAILURE')), 'DURATION_GATE_FAILURE error logged');

  // Test 7: Story Developer Engine Validation
  console.log('\n--- Test 7: Story Developer Engine Validation ---');
  const StoryDeveloper = require('../engine/story-developer');
  const storyDev = new StoryDeveloper();
  const ideaEval = storyDev.evaluateIdea("The Beast You Feed Every Night.");
  assert(ideaEval.tier.includes("Tier 1"), "Story Developer identifies Tier 1 title");
  const concept = storyDev.developStoryConcept(ideaEval);
  assert(concept.character.name === "Ayo", "Story Developer sets Ayo as protagonist");
  const outline = storyDev.generate12BeatOutline(concept);
  assert(outline.length === 12, "Story Developer generates 12-beat outline");
  const review = storyDev.reviewScript(outline);
  assert(review.passed === true && review.score >= 90, "Story Developer validates script against QC checklist (>=90)");

  console.log('\n========================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('========================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
