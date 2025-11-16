import { useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';


const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate(); 

  const handleDelete = () => {
    deleteRecipe(recipeId);
    navigate('/');
  };

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">
      Delete
    </button>
  );
};

export default DeleteRecipeButton;
