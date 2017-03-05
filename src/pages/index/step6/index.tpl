<!-- 搜索列表 -->
<div class="m-box p-step6">
    <div class="pay-item">
        <div class="f-c-black">
            请选择支付方式
        </div>
        <div class="f-mt20">
            <ui-radio v-model="type" :label="1">
                <span class="zfb"></span>
            </ui-radio>
            <ui-radio v-model="type" :label="2">
                <span class="wx"></span>
            </ui-radio>
            <ui-radio v-model="type" :label="0">
                <span class="transfer">对公转账</span>
            </ui-radio>
        </div>
    </div>
    <div class="pay-item">
        <div class="f-c-black">员工工号（可选）</div>
        <div class="f-mt20">
            <input 
                v-model="staffNo"
                class="u-input-text" 
                style="width: 350px;" 
                type="text" 
                placeholder="业务员工号，联系业务员填写">
        </div>
    </div>
    <div class="pay-item">
        <div class="f-c-black">发票信息</div>
        <div class="f-mt20">
            <ui-radio v-model="needInvoice" :label="0">
                <span class="transfer">不开具发票</span>
            </ui-radio>
            <ui-radio v-model="needInvoice" :label="1">
                <span class="transfer">普通发票</span>
            </ui-radio>
        </div>
    </div>
    <div class="pay-item" v-show="needInvoice">
        <div class="f-c-black">发票抬头</div>
        <div class="f-mt20">
            <input class="u-input-text" v-model="invoiceInfo" style="width: 350px;" type="text">
        </div>
    </div>
    <div class="f-clearfix">
        <ui-form-upload-imgs 
            class="f-fl f-mt20" 
            v-show="!type"
            :items="pics"
            :showNum="1"
            @remove="removeImg"
            @mounted="initUploadImg"></ui-form-upload-imgs>
        <div class="pay-infor" v-if="info">
            <template v-if="!type">
                <div class="f-mt10">
                    <span class="f-c-gray">开户银行：</span>
                    <span class="f-c-black">{{info.accountBank}}</span>
                </div>
                <div class="f-mt10">
                    <span class="f-c-gray">开户名称：</span>
                    <span class="f-c-black">{{info.accountName}}</span>
                </div>
                <div class="f-mt10">
                    <span class="f-c-gray">银行卡号：</span>
                    <span class="f-c-black">{{info.bankNO}}</span>
                </div>
                <div class="f-mt10">
                    <span class="f-c-red">请转账时，在备注栏填写机构名称，并将转账凭证完整截图给我们</span>
                </div>
                <hr>
            </template>
            <div class="f-mt20">
                <span class="f-c-gray">{{info.chainCount}}家网店注册费：</span>
                <span>￥</span>
                <span class="f-big" v-text="getTotal(info.registerPrice, info.chainCount)"></span>
            </div>
            <div class="f-mt20">
                <span class="f-c-gray">{{info.chainCount}}家网店服务费：</span>
                <s class="f-c-gray">￥<span v-text="getTotal(info.preTechnoPrice, info.chainCount)"></span></s>
                <span>￥</span>
                <span class="f-big">{{info.technoPrice}}</span>
            </div>
            <div class="f-mt10">
                <span class="f-c-black">应付总额：￥</span>
                <span class="price" v-text="getTotal(info.totalPrice, 1)"></span>
            </div>
            <ui-button type="primary" @click.native="submit">确定</ui-button>
        </div>
    </div>
    
    <!--选择图片-->
    <div style="display:none;">
        <ui-dialog 
            title="扫码支付"
            :visible="isShowPay"
            @close="isShowPay=false">
            <img :src="payQRcodeUri" v-if="payQRcodeUri" style="display:block; margin: 0 auto; width:400px">
            <p style="text-align: center;">
                <ui-button type="primary" @click.native="paySuccess"> 
                    支付成功
                </ui-button>
                <ui-button type="gray" @click.native="payFail">
                    支付失败
                </ui-button>
                <ui-button type="link" @click.native="payChange">
                    其它支付方式
                </ui-button>
            </p>
            
        </ui-dialog>
    </div>
</div>