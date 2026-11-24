const path = require('path');
const StoryDeveloper = require('../engine/story-developer');

console.log("========================================================");
console.log("TESTING WAKELIT STORY DEVELOPER ENGINE");
console.log("========================================================");

const dev = new StoryDeveloper(path.resolve(__dirname, '..'));

// Test 1: Idea Evaluation
const eval1 = dev.evaluateIdea("The Beast You Feed Every Night.");
console.log("\n--- Test 1: Idea Evaluation ---");
console.log("Evaluated Title:", eval1.title);
console.log("Tier:", eval1.tier);
console.log("Estimated CTR:", eval1.estimatedCTR);
console.log("Psychological Pillar:", eval1.psychologicalPillar);
console.log("Recommended Mode:", eval1.recommendedMode);
if (eval1.tier.includes("Tier 1")) {
  console.log("✅ [PASS] Tier 1 detection confirmed");
} else {
  console.error("❌ [FAIL] Tier 1 detection failed");
  process.exit(1);
}

// Test 2: Story Concept
const concept = dev.developStoryConcept(eval1);
console.log("\n--- Test 2: Concept Development ---");
console.log("Character:", concept.character.name, concept.character.palette);
console.log("Antagonist:", concept.antagonist.name);
console.log("Lighting Duality:", concept.lightingDuality);
if (concept.character.name === "Ayo" && concept.antagonist.name === "The Shade") {
  console.log("✅ [PASS] Character and antagonist alignment confirmed");
} else {
  console.error("❌ [FAIL] Character alignment failed");
  process.exit(1);
}

// Test 3: 12-Beat Outline Generation
const outline = dev.generate12BeatOutline(concept);
console.log("\n--- Test 3: 12-Beat Outline Generation ---");
console.log("Generated beats count:", outline.length);
if (outline.length === 12) {
  console.log("✅ [PASS] Exactly 12 beats generated");
} else {
  console.error("❌ [FAIL] Expected 12 beats, got:", outline.length);
  process.exit(1);
}

// Test 4: Quality Review & QC Scorecard
const review = dev.reviewScript(outline);
console.log("\n--- Test 4: Quality Review ---");
console.log("Score:", review.score, "/ 100");
console.log("Passed:", review.passed);
console.log("Passes:", review.passes);
if (review.passed && review.score >= 90) {
  console.log("✅ [PASS] QC Scorecard passed with score >= 90");
} else {
  console.error("❌ [FAIL] QC Scorecard review failed:", review);
  process.exit(1);
}

// Test 5: Instant Reject Test (Negative Test)
const badScript = JSON.parse(JSON.stringify(outline));
badScript[0].narration = "Hey guys, you should make sure to stop scrolling!";
const badReview = dev.reviewScript(badScript);
console.log("\n--- Test 5: Instant Reject on Lecturing Dialogue ---");
console.log("Bad Review Passed:", badReview.passed);
console.log("Instant Reject Reason:", badReview.instantReject);
if (!badReview.passed && badReview.instantReject) {
  console.log("✅ [PASS] Successfully caught and rejected lecturing dialogue");
} else {
  console.error("❌ [FAIL] Failed to catch lecturing dialogue");
  process.exit(1);
}

console.log("\n========================================================");
console.log("ALL STORY DEVELOPER TESTS PASSED (5/5)");
console.log("========================================================");
