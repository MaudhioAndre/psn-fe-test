import { useState } from "react";

export const useCommentDeletion = (router, toast) => {
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const confirmDeleteComment = (id) => {
    setSelectedCommentId(id);
    setDeleteDialogVisible(true);
  };

  const deleteComment = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments/${selectedCommentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        runToast("success", "Success", "Comment deleted");
        router.refresh();
      } else {
        runToast("error", "Error", "Failed delete comment");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      runToast("error", "Error", "Something went wrong!");
    }
    setDeleteDialogVisible(false);
  };

  const runToast = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  return {
    deleteDialogVisible,
    selectedCommentId,
    confirmDeleteComment,
    deleteComment,
    setDeleteDialogVisible,
  };
};