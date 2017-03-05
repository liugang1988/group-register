<label class="u-radio" :class="{
        'z-disabled': disabled,
        'z-checked': label === model
    }"><i class="icon-right"></i> <input type="radio" v-model="model" :value="label" :disabled="disabled"><slot></slot></label>