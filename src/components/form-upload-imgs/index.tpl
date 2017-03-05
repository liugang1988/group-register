<div class="m-form-upload-imgs">
    <div class="img" v-for="(item,index) of items">
        <img :src="item.url||defaultSrc">
        <div class="percent" v-if="!item.url" :style="{height:item.percent+'%'}"></div>
        <i class="icon-close" @click="remove(index)"></i>
    </div>
    <label class="upload" v-show="isShowBtn">
        <div class="upload-label" ref="uploader"></div>
        <slot>添加图片</slot>
    </label>
</div>