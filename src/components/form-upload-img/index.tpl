<div class="m-form-upload-img">
    <div class="box" ref="uploader">
        <div class="uploader"  v-show="status===0"></div>
        <div class="img" v-show="status!==0">
            <img :src="url || defaultSrc">
            <div class="percent" :style="{height:percent+'%'}" v-show="status===1"></div>
        </div>
    </div>
    <div class="title">{{title}}</div>
</div>