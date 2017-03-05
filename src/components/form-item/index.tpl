<div class="m-form-item" :class="className">
    <label class="m-form-item__label" v-if="label">
        {{label}}
    </label>
    <div class="m-form-item__bd">
        <div class="g-row">
            <slot></slot>
        </div>
        <div class="m-form-item__tips">
            {{tips}}
        </div>
    </div>
</div>