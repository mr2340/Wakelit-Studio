const fs = require('fs');
const path = require('path');

class PromptBuilder {
  constructor(baseDir = path.resolve(__dirname, '..')) {
    this.baseDir = baseDir;
    this.knowledgeDir = path.join(this.baseDir, 'knowledge');
  }

  /**
   * Constructs a structured generation prompt from a scene object.
   * Format: [Opening Anchor] [Set & Stage] [Camera & Shot] [Subject & Proportions] [Action] [Emotion] [Lighting] [Negative Constraints]
   * Strictly enforces flat 2D hand-drawn animation matching Character_Ayo_looking_tired_and_5ce88056_2K.jpg.
   * @param {Object} scene
   * @returns {string}
   */
  buildPrompt(scene) {
    if (scene.prompt && scene.prompt.trim().length > 0 && !scene.regeneratePrompt) {
      return scene.prompt.trim();
    }

    const parts = [];

    // 1. Mandatory Opening Anchor Directive
    parts.push(
      "Use the attached character Ayo exactly as drawn in the master reference image. " +
      "2D flat minimalist cartoon animation, flat clean illustrated shapes, thin hand-drawn outline, zero 3D shading."
    );

    // 2. Set & Stage Environment
    const env = scene.environment || "sparse minimalist dark bedroom with desk and clock";
    parts.push(`Setting is ${env}, flat side-on theatrical stage with no deep perspective.`);

    // 3. Camera Discipline & Shot Scale (Preventing fake Ken Burns digital zooms)
    const cam = scene.camera || "Cinematic locked tripod camera, completely static framing with zero digital zoom";
    parts.push(`${cam}. Full frame 16:9 illustrated composition with edge-to-edge environment, static camera with natural character motion.`);

    // 4. Character Subject & Master Reference Anchor
    parts.push(
      "Ayo is a stylized minimalist character: round deep brown head #613729, " +
      "mustard ochre hoodie #D2A23E with collar fold down, grey trousers #666668, white shoes #EDEEF0, " +
      "mitten hands with thumb bump. No neck, no ears, no nose, no individual fingers, no hair."
    );

    // 5. Action / Posture
    if (scene.action) {
      parts.push(`${scene.action}.`);
    }

    // 6. Eyebrow & Facial Emotion Spec
    if (scene.expression) {
      parts.push(
        `Facial expression: ${scene.expression}. Black dot eyes with tiny white specular catchlights, ` +
        `expressive thick curved eyebrows carrying the emotional weight, subtle controlled 2% micro-movement.`
      );
    }

    // 7. Lighting & Palette
    if (scene.lighting) {
      parts.push(`Lighting: ${scene.lighting}.`);
    } else {
      parts.push("Cold screen blue (#1B2A4A, #6FA8FF) ambient glow against dark ink slate background (#0B0D14).");
    }

    // 8. Negative Constraints & Guardrails (Strictly forbidding 3D/CGI/Unreal/Octane & Fake Digital Zoom)
    parts.push(
      "NEGATIVE CONSTRAINTS: strictly no 3D rendering, no CGI, no Octane render, no Unreal Engine, " +
      "no photorealistic skin textures, no volumetric specular shading, no glossy highlights, " +
      "no claymation or plastic vinyl shine, no realistic human anatomy, no nose, no ears, no neck, " +
      "no fingers, no mitten fingers, no hair on Ayo, no extra characters, no camera shake, no blur, " +
      "no digital zoom, no camera push-in, no Ken Burns zooming effect, no text, no captions, no black side pillars."
    );

    return parts.join(' ').replace(/\s+/g, ' ').trim();
  }
}

module.exports = PromptBuilder;
