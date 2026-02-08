// @desc    Get learning resources for a specific tech
// @route   GET /api/resources/:tech
exports.getResources = async (req, res) => {
  const { tech } = req.params;
  
  // Abhi ke liye hum dummy data bhej rahe hain
  const resources = {
    java: {
      youtube: "https://youtube.com/playlist?list=...",
      docs: "https://docs.oracle.com/en/java/",
      tip: "Focus on OOPs concepts and Collections Framework."
    }
  };

  const data = resources[tech.toLowerCase()];

  if (data) {
    res.status(200).json({ success: true, data });
  } else {
    res.status(404).json({ success: false, error: "Tech resources not found" });
  }
};