import { useEffect, useState } from "react";
import classes from "./EmailForm.module.css";
import { getUsername } from "../../helper";
import MailDraft from "./MailDraft";

const Draft = () => {
  const [draftMails, setDraftMails] = useState([]);
  const [selectedDraft, setSelectedDraft] = useState(null);
  const username = localStorage.getItem("email") || " ";
  const user = getUsername(username);

  useEffect(() => {
    // Fetch initial draft data
    fetchDraftMails();

    // Set up interval for real-time updates
    const interval = setInterval(fetchDraftMails, 2000);

    // Cleanup function to clear the interval when component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchDraftMails = () => {
    fetch(
      `https://mail-box-client-93081-default-rtdb.firebaseio.com/${user}/drafts/.json`
    )
      .then((res) => res.json())
      .then((data) => {
        const drafts = Object.entries(data).map(([key, value]) => ({
          key,
          ...value,
        }));
        setDraftMails(drafts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openDraftHandler = (draft) => {
    setSelectedDraft(draft);
  };

  const handleBack = () => {
    setSelectedDraft(null);
  };

  const deleteDraftHandler = (draftKey) => {
    // Make a DELETE request to the API to delete the draft
    fetch(
      `https://mail-box-client-93081-default-rtdb.firebaseio.com/${user}/drafts/${draftKey}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // Update the draftMails state by removing the deleted draft
        const updatedDraftMails = draftMails.filter(
          (draft) => draft.key !== draftKey
        );
        setDraftMails(updatedDraftMails);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={classes.form}>
        <h3>Draft</h3>
        {selectedDraft ? (
          <MailDraft draft={selectedDraft} onBack={handleBack} />
        ) : (
          draftMails.map((draft) => (
            <div className={classes.card} key={draft.key}>
              <h4>{draft.subject}</h4>
              <p>To: {draft.to}</p>
              <div className={classes.buttons}>
                <button onClick={() => openDraftHandler(draft)}>Open</button>
                <button onClick={() => deleteDraftHandler(draft.key)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Draft;
