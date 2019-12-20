export interface MenuData{
    collapsed: boolean
    breakpoint: boolean
}

const menuReducer = (state:MenuData = {collapsed: false,breakpoint:false},action:{type:string,payload:any}) => {
    switch(action.type){
        case 'set_collapsed':return {...state,collapsed:action.payload};
        case 'set_breakpoint':return {...state,breakpoint:action.payload};
        default : return state;
    }
}



export {menuReducer}