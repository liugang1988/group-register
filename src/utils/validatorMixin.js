import Vue from 'vue';
import Validation from 'vuelidate';

Vue.use(Validation);

export default {
    methods: {
        getErrorText(v, items) {
            let text = '';
            if (v.$error) {
                items.every((item) => {
                    const type = item.type;
                    if (type === '$each') {
                        if (v.$each.$error) {
                            text = item.text;
                            return false;
                        }
                    } else if (!v[type]) {
                        text = item.text;
                        return false;
                    }
                    return true;
                });
            }
            return text;
        }
    }
};
