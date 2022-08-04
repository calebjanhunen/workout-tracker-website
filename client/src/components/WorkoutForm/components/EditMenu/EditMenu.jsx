import { Menu, MenuItem } from '@material-ui/core';
import { Clear, Reorder } from '@mui/icons-material';

const EditMenu = ({
    anchorEl,
    setAnchorEl,
    setReorder,
    handleClearTemplate,
}) => {
    function handleReorderExercises() {
        setReorder(true);
        setAnchorEl(null);
    }
    return (
        <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
        >
            <MenuItem className="menu-option" onClick={handleReorderExercises}>
                <Reorder />
                Reorder Exercises
            </MenuItem>
            <MenuItem className="menu-option" onClick={handleClearTemplate}>
                <Clear />
                Clear Template
            </MenuItem>
        </Menu>
    );
};

export default EditMenu;
