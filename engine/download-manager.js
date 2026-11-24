const fs = require('fs');
const path = require('path');

class DownloadManager {
  constructor(logger = console) {
    this.logger = logger;
    this.totalBytesDownloaded = 0;
  }

  /**
   * Intercepts Playwright download event, saves to target path and records bandwidth.
   * @param {import('playwright').Download} download
   * @param {string} targetFilePath
   * @returns {Promise<{success: boolean, filePath: string, sizeBytes: number, downloadTimeMs: number}>}
   */
  async handlePlaywrightDownload(download, targetFilePath) {
    const startTime = Date.now();
    try {
      const targetDir = path.dirname(targetFilePath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const suggestedName = download.suggestedFilename();
      this.logger.info(`Starting download: ${suggestedName} -> ${targetFilePath}`);
      await download.saveAs(targetFilePath);

      // Verify file exists and has non-trivial size (>10KB)
      if (!fs.existsSync(targetFilePath)) {
        throw new Error(`File was not created at ${targetFilePath}`);
      }

      const stats = fs.statSync(targetFilePath);
      if (stats.size < 10240) {
        throw new Error(`Downloaded file is unexpectedly small (${stats.size} bytes) at ${targetFilePath}`);
      }

      const elapsed = Date.now() - startTime;
      this.totalBytesDownloaded += stats.size;
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      const speedMBs = (parseFloat(sizeMB) / (elapsed / 1000)).toFixed(2);

      this.logger.info(`Download completed: ${path.basename(targetFilePath)} (${sizeMB} MB in ${elapsed}ms @ ${speedMBs} MB/s)`);

      return {
        success: true,
        filePath: targetFilePath,
        sizeBytes: stats.size,
        downloadTimeMs: elapsed
      };
    } catch (err) {
      this.logger.error(`Download handling error: ${err.message}`);
      return {
        success: false,
        error: err.message
      };
    }
  }

  /**
   * Checks whether a scene video file already exists on disk and is valid.
   * Prevents duplicate re-downloads and bandwidth waste.
   * @param {string} targetFilePath
   * @returns {boolean}
   */
  isSceneAlreadyDownloaded(targetFilePath) {
    if (!fs.existsSync(targetFilePath)) return false;
    const stats = fs.statSync(targetFilePath);
    return stats.size > 10240; // greater than 10KB
  }

  /**
   * Returns total data downloaded in megabytes.
   */
  getTotalDataMB() {
    return (this.totalBytesDownloaded / (1024 * 1024)).toFixed(2);
  }
}

module.exports = DownloadManager;
