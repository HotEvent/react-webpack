const menuReducer = (state:{collapsed: boolean} = {collapsed: false},action:{type:string,payload:any}) => {
    switch(action.type){
        case 'toogle_menu':return {...state,collapsed:!state.collapsed};
        default : return state;
    }
}



export {menuReducer}