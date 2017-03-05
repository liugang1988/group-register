<!-- 搜索列表 -->
<div class="m-box">
    <ui-form type="v">
        <ui-form-item 
            label="入驻网店数：" 
            :tips="getErrorText($v.chainCount, msg.chainCount)" 
            :state="$v.chainCount.$error" 
            :required="true">
            <input class="u-input-text w50" 
                type="text" 
                placeholder="请输入整数" 
                v-model="chainCount"
                @blur="$v.chainCount.$touch()"
                @focus="$v.chainCount.$reset()"/>
        </ui-form-item>
        <ui-form-item 
            label="公司名称：" 
            :tips="getErrorText($v.organName, msg.organName)" 
            :state="$v.organName.$error" 
            :required="true">
            <input class="u-input-text w50" 
                type="text" 
                placeholder="例如：深圳市指尖城市网络科技有限公司" 
                v-model="organName"
                @blur="$v.organName.$touch()"
                @focus="$v.organName.$reset()"/>
            <div class="m-form-item__text">
                <span class="f-c-red">{{organName.length || 0}}/30</span>字
            </div>
        </ui-form-item>
        <ui-form-item 
            label="法定代表人：" 
            :tips="getErrorText($v.legalPerson, msg.legalPerson)" 
            :state="$v.legalPerson.$error" 
            :required="true">
            <input class="u-input-text w50" 
                type="text" 
                placeholder="法定代表人" 
                v-model="legalPerson"
                @blur="$v.legalPerson.$touch()"
                @focus="$v.legalPerson.$reset()"/>
            <div class="m-form-item__text">
                <span class="f-c-red">{{legalPerson.length || 0}}/15</span>字
            </div>
        </ui-form-item>
        <ui-form-item 
            label="法人联系电话：" 
            :tips="getErrorText($v.legalPhone, msg.legalPhone)" 
            :state="$v.legalPhone.$error" 
            :required="true">
            <input class="u-input-text w50" 
                type="text" 
                placeholder="法人联系电话" 
                v-model="legalPhone"
                @blur="$v.legalPhone.$touch()"
                @focus="$v.legalPhone.$reset()"/>
        </ui-form-item>
        <ui-form-item 
            label="法人身份证号码：" 
            :tips="getErrorText($v.identityCard, msg.identityCard)" 
            :state="$v.identityCard.$error" 
            :required="true">
            <input class="u-input-text w50" 
                type="text" 
                placeholder="法人身份证号码" 
                v-model="identityCard"
                @blur="$v.identityCard.$touch()"
                @focus="$v.identityCard.$reset()"/>
        </ui-form-item>
        <ui-form-item
            label="上传认证资料：" 
            :tips="getErrorText($v.pics, msg.pics)" 
            :state="$v.pics.$error" 
            :required="true">   
            <div class="certificate-list">
                <ui-form-upload-img 
                    v-for="(item,index) of pics"
                    :id="index"
                    :title="item.title"
                    :url="item.url"
                    :percent="item.percent"
                    :status="item.status"
                    :init-fn="initFn"
                    @remove="removeImg"></ui-form-upload-img>
            </div>
        </ui-form-item>
        <ui-form-item>
            <ui-button type="primary" @click.native="submit">提交</ui-button>
        </ui-form-item>
    </ui-form>
</div>