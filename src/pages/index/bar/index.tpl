<!-- 步骤 -->
<div class="m-box m-step">
    <div 
        class="step-item" 
        v-for="(item,index) of items" 
        :class="{
            'z-active':index+1<=step
        }"
    >
        <div class="f-tac">{{index+1}}.{{item}}</div>
        <div class="flag"></div>
    </div>
</div>