import Issue from "../models/issue.js";


export const getIssues = async (req, res) => {
  try {
    const userId = req.user.id;
    const issues = await Issue.find({ user: userId });

    if (!issues.length) {
      return res.status(404).json({ success: false, message: "No issues found" });
    }

    res.status(200).json({ success: true, data: issues });
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const createIssue = async (req, res) => {
  try {
    const { category, desc, attachment, location } = req.body;

    if (!category || !desc || !location?.latitude || !location?.longitude) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newIssue = new Issue({
      user: req.user.id,
      category,
      desc,
      attachment,
      location
    });

    await newIssue.save();

    res.status(201).json({ success: true, message: "Issue reported successfully", data: newIssue });
  } catch (error) {
    console.error("Error creating issue:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateIssueStatus = async (req, res) => {
  try {
    const { issueId } = req.params;
    const { status } = req.body;

    if (!["pending", "resolved"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updatedIssue = await Issue.findByIdAndUpdate(
      issueId,
      { status },
      { new: true }
    );

    if (!updatedIssue) {
      return res.status(404).json({ success: false, message: "Issue not found" });
    }

    res.status(200).json({ success: true, message: "Issue status updated", data: updatedIssue });
  } catch (error) {
    console.error("Error updating issue status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const deleteIssue = async (req, res) => {
  try {
    const { issueId } = req.params;

    const deletedIssue = await Issue.findByIdAndDelete(issueId);

    if (!deletedIssue) {
      return res.status(404).json({ success: false, message: "Issue not found" });
    }

    res.status(200).json({ success: true, message: "Issue deleted successfully" });
  } catch (error) {
    console.error("Error deleting issue:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
