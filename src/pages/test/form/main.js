import Vue from 'vue';
import {
    required,
    email
} from 'vuelidate/lib/validators';
import uiButton from '../../../components/button';
import uiCheckbox from '../../../components/checkbox';
import uiRadio from '../../../components/radio';
import uiForm from '../../../components/form';
import uiFormItem from '../../../components/form-item';
import uiFormUploadImg from '../../../components/form-upload-img';
import validatorMixin from '../../../utils/validatorMixin';

const hasABC = v => v.indexOf('ABC') >= 0;

new Vue({
    el: '#app',
    mixins: [validatorMixin],
    components: {
        uiButton,
        uiCheckbox,
        uiRadio,
        uiForm,
        uiFormItem,
        uiFormUploadImg
    },
    data: {
        checkbox: [],
        radio: '',
        email: {
            v: '',
            messages: [{
                type: 'required',
                text: '必须写'
            }, {
                type: 'hasABC',
                text: 'hasABC'
            }, {
                type: 'email',
                text: 'email'
            }]
        },
        pics: [{
            imgUrl: ''
        }]
    },
    validations: {
        email: {
            v: {
                required,
                email,
                hasABC
            }
        }
    },
    methods: {
        submit() {

        }
    }
});
