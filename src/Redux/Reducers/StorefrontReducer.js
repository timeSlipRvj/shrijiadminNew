import * as actionTypes from '../Constants/StorefrontConstants'

export const getGeneralReducer = (state = { store: {}}, action) => {
    switch(action.type){
        case actionTypes.GET_GENERAL_REQUEST:
            return{
                loading: true,
                store: { }
            }
        case actionTypes.GET_GENERAL_SUCCESS:
            return {
                loading: false,
                store: action.payload
            }
        case actionTypes.GET_GENERAL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const getFooterReducer = (state = { footerData: {}}, action) => {
    switch(action.type){
        case actionTypes.GET_FOOTER_REQUEST:
            return{
                loading: true,
                footerData: { }
            }
        case actionTypes.GET_FOOTER_SUCCESS:
            return {
                loading: false,
                footerData: action.payload
            }
        case actionTypes.GET_FOOTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const getProductTabsReducer = (state = { allTabs: [{SectionStatus: false},{SectionStatus: false}, {SectionStatus: false}], loading: true}, action) => {
    switch(action.type){
        case actionTypes.GET_PRODUCT_TABS_REQUEST:
            return{
                loading: true,
                allTabs: [{SectionStatus: false},{SectionStatus: false}, {SectionStatus: false}]
            }
        case actionTypes.GET_PRODUCT_TABS_SUCCESS:
            return {
                loading: false,
                allTabs: action.payload
            }
        case actionTypes.GET_PRODUCT_TABS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
export const getFeaturedCategoriesTabsReducer = (state = { featuredCategories: {SectionStatus: false}, loading: true}, action) => {
    switch(action.type){
        case actionTypes.GET_FEATURED_CATEGORIES_REQUEST:
            return{
                loading: true,
                featuredCategories: {SectionStatus: false}
            }
        case actionTypes.GET_FEATURED_CATEGORIES_SUCCESS:
            return {
                loading: false,
                featuredCategories: action.payload
            }
        case actionTypes.GET_FEATURED_CATEGORIES_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
export const getFeaturesReducer = (state = { features: {}}, action) => {
    switch(action.type){
        case actionTypes.GET_FEATURES_REQUEST:
            return{
                loading: true,
                features: { }
            }
        case actionTypes.GET_FEATURES_SUCCESS:
            return {
                loading: false,
                features: action.payload
            }
        case actionTypes.GET_FEATURES_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const getLogosReducer = (state = { logos: {}}, action) => {
    switch(action.type){
        case actionTypes.GET_LOGO_REQUEST:
            return{
                loading: true,
                logos: { }
            }
        case actionTypes.GET_LOGO_SUCCESS:
            return {
                loading: false,
                logos: action.payload
            }
        case actionTypes.GET_LOGO_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const getBannersReducer = (state = { banners: {}}, action) => {
    switch(action.type){
        case actionTypes.GET_BANNERS_REQUEST:
            return{
                loading: true,
                banners: { }
            }
        case actionTypes.GET_BANNERS_SUCCESS:
            return {
                loading: false,
                banners: action.payload
            }
        case actionTypes.GET_BANNERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const getBrandsReducer = (state = { brands: []}, action) => {
    switch(action.type){
        case actionTypes.GET_BRANDS_REQUEST:
            return{
                loading: true,
                brands: []
            }
        case actionTypes.GET_BRANDS_SUCCESS:
            return {
                loading: false,
                brands: action.payload
            }
        case actionTypes.GET_BRANDS_FAIL:
            return {
                loading: false,
                brands:[],
                error: action.payload
            }
        default:
            return state;
    }
}

export const getTopBrandsReducer = (state = { topBrands: {TopBrands:{TopBrands:[], SectionStatus: false}}}, action) => {
    switch(action.type){
        case actionTypes.GET_TOP_BRANDS_REQUEST:
            return{
                loading: true,
                topBrands: {TopBrands:{TopBrands:[]}}
            }
        case actionTypes.GET_TOP_BRANDS_SUCCESS:
            return {
                loading: false,
                topBrands: action.payload
            }
        case actionTypes.GET_TOP_BRANDS_FAIL:
            return {
                loading: false,
                topBrands:{TopBrands:{TopBrands:[]}},
                error: action.payload
            }
        default:
            return state;
    }
}

export const getTopCategoriesReducer = (state = { TopCategories: {TopCategories:{TopCategories:[], SectionStatus: false}}}, action) => {
    switch(action.type){
        case actionTypes.GET_TOP_CATEGORIES_REQUEST:
            return{
                loading: true,
                TopCategories: {TopCategories:{TopCategories:[]}}
            }
        case actionTypes.GET_TOP_CATEGORIES_SUCCESS:
            return {
                loading: false,
                TopCategories: action.payload
            }
        case actionTypes.GET_TOP_CATEGORIES_FAIL:
            return {
                loading: false,
                TopCategories:{TopCategories:{TopCategories:[]}},
                error: action.payload
            }
        default:
            return state;
    }
}

export const getClientReviewsReducer = (state = { reviews: {sectionstatus: false}}, action) => {
    switch(action.type){
        case actionTypes.GET_CLIENT_REVIEW_REQUEST:
            return{
                loading: true,
                reviews: {sectionstatus: false}
            }
        case actionTypes.GET_CLIENT_REVIEW_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }
        case actionTypes.GET_CLIENT_REVIEW_FAIL:
            return {
                loading: false,
                reviews:{sectionstatus: false},
                error: action.payload
            }
        default:
            return state;
    }
}
