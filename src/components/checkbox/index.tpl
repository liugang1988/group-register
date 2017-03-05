<label 
    class='u-checkbox' 
    :class="{
        'z-checked':checked,
        'z-disabled': disabled
    }"
>
    <input type="checkbox" v-model='model' :value='label' @change="change" :disabled="disabled">
    <slot></slot>
</label>