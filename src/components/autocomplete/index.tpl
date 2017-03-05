<div class="m-autocomplete" v-clickoutside="outside">
    <input 
        class="u-input-text" 
        type="text" 
        :placeholder="placeholder" 
        :value="value"
        :disabled="disabled" 
        @input="change"
        @blur="blur"
        @focus="focus"
        @keydown.up="highlight(highlightedIndex - 1)"
        @keydown.down="highlight(highlightedIndex + 1)"
        @keydown.enter.stop="select(highlightedIndex)"/>
    <div 
        class="m-autocomplete__items" 
        ref="suggestions"
        v-if="suggestionVisible">
        <div v-if="loading">
            loading...
        </div> 
        <template v-for="(item,index) of suggestions">
            <div 
                class="m-autocomplete__item"
                v-if="!customItem"
                :class="{'z-active': highlightedIndex === index}"
                @click="select(index)"
            >
                {{item.value}}
            </div>
            <component
                v-else
                :class="{'z-active': highlightedIndex === index}"
                @click.native="select(index)"
                :is="customItem"
                :item="item"
                :index="index">
            </component>
        </template>
    </div>
</div>