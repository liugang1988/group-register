<div class="m-toast" v-show="show">
    <ui-icon :name="iconName" v-if="iconName"></ui-icon>
    <div class="m-toast__text">
        {{content}}
    </div>
</div>