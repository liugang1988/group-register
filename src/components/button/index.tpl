<button class='btn' :class='className'>
    <ui-icon :name="iconName" v-if="iconName"></ui-icon>
    <slot></slot>
</button>