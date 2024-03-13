import { MENU_ACTIVE } from '../Constants';
import { MENU_DEACTIVE } from '../Constants';

export const menuActive = () => {
    return {
        type: MENU_ACTIVE,
    }
}

export const menuDeactive = () => {
    return {
        type: MENU_DEACTIVE,
    }
}