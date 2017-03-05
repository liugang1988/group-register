/**
 * 自动完成
 */
import clickoutside from '../../utils/clickoutside';

export default {
    template: __inline('index.tpl'),
    directives: {
        clickoutside
    },
    props: {
        placeholder: String,
        disabled: Boolean,
        value: String,
        triggerOnFocus: {
            type: Boolean,
            default: true
        },
        customItem: String,
        fetchSuggestions: Function
    },
    data() {
        return {
            timer: null,
            suggestions: [],
            suggestionVisible: false,
            loading: false,
            highlightedIndex: -1
        };
    },
    mounted() {
        this.$parent.popperElm = this.popperElm = this.$el;
    },
    methods: {
        change(e) {
            const value = e.target.value;
            this.$emit('input', value);
            this.showSuggestions(value);
        },
        focus() {
            if (this.triggerOnFocus && this.value) {
                this.showSuggestions(this.value);
                this.$emit('focus');
            }
        },
        blur() {
            this.$emit('blur');
        },
        outside() {
            this.hideSuggestions();
        },
        select(index) {
            if (this.suggestions && this.suggestions[index]) {
                this.$emit('input', this.suggestions[index].value);
                this.$emit('select', this.suggestions[index]);
                this.$nextTick(() => {
                    this.hideSuggestions();
                });
            }
        },
        hideSuggestions() {
            this.suggestionVisible = false;
            this.suggestions = [];
            this.loading = false;
            clearTimeout(this.timer);
            this.timer = null;
        },
        _showSuggestions(value) {
            this.fetchSuggestions(value).then(
                (suggestions) => {
                    this.loading = false;
                    if (Array.isArray(suggestions) && suggestions.length > 0) {
                        this.suggestions = suggestions;
                    } else {
                        this.hideSuggestions();
                    }
                },
                () => {
                    this.loading = false;
                    this.hideSuggestions();
                }
            );
        },
        showSuggestions(value) {
            if (typeof this.fetchSuggestions === 'function') {
                this.suggestionVisible = true;
                this.loading = true;
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this._showSuggestions(value);
                }, 300);
            }
        },
        highlight(index) {
            if (!this.suggestionVisible || this.loading) {
                return;
            }
            if (index < 0) {
                index = 0;
            } else if (index >= this.suggestions.length) {
                index = this.suggestions.length - 1;
            }
            const elSuggestions = this.$refs.suggestions;
            const elSelect = elSuggestions.children[index];
            const scrollTop = elSuggestions.scrollTop;
            const offsetTop = elSelect.offsetTop;
            if (offsetTop + elSelect.scrollHeight > (scrollTop + elSuggestions.clientHeight)) {
                elSuggestions.scrollTop += elSelect.scrollHeight;
            }
            if (offsetTop < scrollTop) {
                elSuggestions.scrollTop -= elSelect.scrollHeight;
            }
            this.highlightedIndex = index;
        }
    }
};

