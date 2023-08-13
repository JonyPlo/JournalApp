import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView } from '../views';
import { useSelector } from 'react-redux';
import { CheckingAuth } from '../../ui/CheckingAuth';

export const JournalPage = () => {
  const { status } = useSelector((state) => state.auth);

  return (
    <>
      {status === 'checking' && <CheckingAuth />}
      <JournalLayout>
        <NothingSelectedView />
        <IconButton
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
    </>
  );
};
