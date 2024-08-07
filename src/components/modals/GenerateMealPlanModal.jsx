import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useUser } from '@/providers/UserContext';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function GenerateMealPlanModal() {
  const { handleOpenGenerateMealPlanModal, openGenerateMealPlanModal } =
    useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <Modal
      open={openGenerateMealPlanModal}
      onClose={handleOpenGenerateMealPlanModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      size="small"
    >
      <Box sx={style} className="bg-zinc-900 rounded-xl w-[300px]">
        {loading ? (
          <div className="flex gap-2 5 items-center justify-center">
            <MoonLoader color="#fff" size={25} />
            <p className="text-white text-sm">Extracting Recipe...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-sm text-center">
              Generate Meal Plan
            </h2>
            <p className="text-xs text-center">
              Import the recipe url and we will import the ingredients
            </p>

            {/* <div className="justify-center flex">
              <button
                onClick={() => {
                  handleOpenAddRecipeModal();
                  handleOpenAddRecipeModalFull();
                }}
                className="capitalize text-xs text-blue-500 hover:text-white mt-3"
              >
                or enter manually
              </button>
            </div> */}

            {error && (
              <p className="text-red-500 text-xs text-center mt-2">{error}</p>
            )}
          </div>
        )}
      </Box>
    </Modal>
  );
}
