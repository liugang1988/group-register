<div class="m-dialog" v-show="visible">
    <div class="m-dialog__table">
        <div class="m-dialog__td">
            <div class="m-dialog__box" :style="width && {width:width+'px'}">
                <div class="m-dialog__header">
                    <i class="icon-wrong" @click="close"></i>
                    <div class="m-dialog__title">{{title}}</div>
                </div>
                <div class="m-dialog__body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</div>