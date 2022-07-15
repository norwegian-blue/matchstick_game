import { createStore } from "vuex";
import { match } from "./match-module";
const store = createStore({
    modules: {
        match,
    },
});
export default store;