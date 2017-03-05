<!-- 搜索列表 -->
<div class="m-box">
    <ui-form type="v" v-if="info && domain">
        <ui-form-item label="上传认证资料：">
            <a class="certificate" :href="domain+'/'+info.bizLicense" target="_blank">
                <img :src="domain+'/'+info.bizLicense">
                营业执照正本
            </a>
            <a class="certificate" :href="domain+'/'+info.legalCardFront" target="_blank">
                <img :src="domain+'/'+info.legalCardFront">
                法人身份证正面
            </a>
            <a class="certificate" :href="domain+'/'+info.legalCardRev" target="_blank">
                <img :src="domain+'/'+info.legalCardRev">
                法人身份证反面
            </a>
            <a class="certificate" :href="domain+'/'+info.contactCardHand" target="_blank">
                <img :src="domain+'/'+info.contactCardHand">
                负责人身份证正面
            </a>
            <a class="certificate" :href="domain+'/'+info.contactCardFront" target="_blank">
                <img :src="domain+'/'+info.contactCardFront">
                负责人身份证反面
            </a>
            <a class="certificate" :href="domain+'/'+info.contactCardRev" target="_blank">
                <img :src="domain+'/'+info.contactCardRev">
                负责人手持身份证
            </a>
        </ui-form-item>
        <ui-form-item label="公司名称：">
            {{info.organName}}
        </ui-form-item>
        <ui-form-item label="店铺名称：">
            {{info.groupName}}
        </ui-form-item>
        <ui-form-item label="简介：">
            {{info.intro}}
        </ui-form-item>
        <ui-form-item label="教学科目：">
            {{info.subjects}}
        </ui-form-item>
        <ui-form-item label="特色科目：">
            {{info.featureSubject}}
        </ui-form-item>
        <ui-form-item label="教学地址：">
            {{address}}
        </ui-form-item>
        <ui-form-item label="E-mail：">
            {{info.contactMail}}
        </ui-form-item>
        <ui-form-item label="联系电话：">
            {{info.telephone}}
        </ui-form-item>
        <ui-form-item label="法定代表人：">
            {{info.legalPerson}}
        </ui-form-item>
        <ui-form-item label="法人联系电话：">
            {{info.legalPhone}}
        </ui-form-item>
        <ui-form-item label="入驻网店数：">
            {{info.chainCount}}
        </ui-form-item>
    </ui-form>
    <div v-else>
        正在加载...
    </div>
</div>