<!-- 网店检索 -->
<div class="m-box p-header" :class="'p-header--'+step">
    <h2>{{items[step-1]}}</h2>
    <div class="detail" v-if="step===1">
        请认真填写机构入驻信息，确保资料真实性及可靠性，确定并提交。
        <a 
            class="btn--link" 
            href="version.html" 
            target="_blank">《版本划分对照表》</a>
    </div>
    <div class="detail" v-if="step===2">
        请认真填写机构入驻信息，确保资料真实性及可靠性，确定并提交。
        <a 
            class="btn--link" 
            href="version.html" 
            target="_blank">《版本划分对照表》</a>
    </div>
    <div class="detail" v-if="step===3">
        润教育将在10个工作日内完成审核，如提交信息未通过审核，请及时修改并重新提交，逾期未提交审核状态将失效。
        <a 
            class="btn--link" 
            href="version.html" 
            target="_blank">《版本划分对照表》</a>
    </div>
    <div class="detail" v-if="step===4">
        当您勾选屏幕下方【我已阅读并认可本协议的全部内容】并点击“确定”，即意味着您使用的润•教育账户所对应的法律实体同意受本协议约束。
如您需要签署纸质协议存档，请您点击“下载”协议文本，并与润·教育的工作人员取得联系。

        <a 
            class="btn--link" 
            href="version.html" 
            target="_blank">《版本划分对照表》</a>
    </div>
    <div class="detail" v-if="step===5">
        线上支付或转账所需服务费用，经财务确认即可完成缴纳。
        <a 
            class="btn--link" 
            href="version.html" 
            target="_blank">《版本划分对照表》</a>
        <a 
            class="btn--link" 
            href="contract-detail.html"
            target="_blank">《润•教育才艺教学服务平台服务协议》</a>
        <a 
            class="btn--link" 
            href="/api/group/v10/auto/contract/download"
            target="_blank">下载《合同》</a>
    </div>
    <div class="detail" v-if="step===6">
        润教育为机构开通账号并提交网店相关资料。
        <a 
            class="btn--link" 
            href="version.html" 
            target="_blank">《版本划分对照表》</a>
        <a 
            class="btn--link" 
            href="contract-detail.html" 
            target="_blank">《润•教育才艺教学服务平台服务协议》</a>
        <span class="openSuccess">等待开通</span>
    </div>
</div>