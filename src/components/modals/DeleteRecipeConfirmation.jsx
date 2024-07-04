import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useUser } from '@/providers/UserContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteRecipeConfirmation({
  openDeleteRecipeModal,
  setOpenDeleteRecipeModal,
  deleteRecipe,
}) {
  const { currentRecipe } = useUser();
  const [url, setUrl] = useState(
    'https://www.homechef.com/meals/steak-and-mushroom-white-wine-sauce-standard'
  );

  return (
    <Modal
      open={openDeleteRecipeModal}
      onClose={() => setOpenDeleteRecipeModal((prev) => !prev)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      size="small"
    >
      <Box sx={style} className="bg-zinc-900 rounded-xl w-[300px]">
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-sm text-center capitalize">
            Are you sure you want to permanently delete the recipe?
          </h2>

          <div className="flex flex-col gap-2">
            <button
              onClick={deleteRecipe}
              className="border border-white rounded-md py-1"
            >
              yes
            </button>
            <button
              onClick={() => setOpenDeleteRecipeModal(false)}
              className="text-red-500 border border-red-500 rounded-md py-1"
            >
              no
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
