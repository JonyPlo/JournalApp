import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { useDispatch, useSelector } from 'react-redux';
import { CheckingAuth } from '../../ui/CheckingAuth';
import { startNewNote } from '../../store/journal/thunks';

export const JournalPage = () => {
  const { status } = useSelector((state) => state.auth);
  const { isSaving, activeNote } = useSelector((state) => state.journal);
  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <>
      {status === 'checking' ? (
        <CheckingAuth />
      ) : (
        <JournalLayout>
          {activeNote ? <NoteView /> : <NothingSelectedView />}
          <IconButton
            onClick={onClickNewNote}
            disabled={isSaving}
            size='large'
            sx={{
              color: 'white',
              backgroundColor: 'error.main',
              ':hover': {
                backgroundColor: 'error.main',
                opacity: 0.9,
              },
              position: 'fixed',
              right: 50,
              bottom: 50,
            }}
          >
            <AddOutlined sx={{ fontSize: 30 }} />
          </IconButton>
        </JournalLayout>
      )}
    </>
  );
};
