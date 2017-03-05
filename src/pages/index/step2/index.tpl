<div class="m-box">
    <!--填资料-->
    <ui-form type="v" v-if="!groupId">
        <ui-form-item 
            label="网店名称：" 
            :tips="getErrorText($v.groupName, msg.groupName)" 
            :state="$v.groupName.$error"
            :required="true">
            <ui-autocomplete
                class="w80"
                v-model="groupName"
                placeholder="请填写网店名称" 
                :fetch-suggestions="_search"
                @select="select"
                @blur="$v.groupName.$touch()"
                @focus="$v.groupName.$reset()"></ui-autocomplete>
            <div class="m-form-item__text">
                <span class="f-c-red">{{groupName.length || 0}}/30</span>字
            </div>
        </ui-form-item>
        <ui-form-item 
            label="简介：" 
            :tips="getErrorText($v.intro, msg.intro)" 
            :state="$v.intro.$error">
            <textarea 
                class="u-textarea w80" 
                placeholder="请填写网店简介" 
                v-model.trim="intro"
                @blur="$v.intro.$touch()"
                @focus="$v.intro.$reset()"></textarea>
            <div class="m-form-item__text">
                <span class="f-c-red">{{intro.length || 0}}/2000</span>字
            </div>
        </ui-form-item>
        <ui-form-item 
            label="教学科目："
            :required="true" 
            :tips="getErrorText($v.subjects, msg.subjects)" 
            :state="$v.subjects.$error">
            <ui-checkbox 
                style="padding:0;"
                v-for="item of subjectsItems" 
                v-model="subjects" 
                :label="item.id"
                @change="$v.subjects.$touch()">
                {{item.name}}
            </ui-checkbox>
        </ui-form-item>
        <ui-form-item 
            label="特色科目："
            :tips="getErrorText($v.featureSubject, msg.featureSubject)" 
            :state="$v.featureSubject.$error">
            <input 
                class="u-input-text w50" 
                type="text"
                placeholder="请填写特色科目" 
                v-model.trim="featureSubject"
                @blur="$v.featureSubject.$touch()"
                @focus="$v.featureSubject.$reset()" />
            <div class="m-form-item__text">
                <span class="f-c-red">{{featureSubject.length || 0}}/20</span>字
            </div>
        </ui-form-item>
        <ui-form-item 
            label="教学地址：" 
            :required="true"
            :tips="getErrorText($v.address, msg.address) || getErrorText($v.tradeVal, msg.tradeVal)" 
            :state="$v.address.$error || $v.tradeVal.$error" 
        >
            <select class="u-select w15" v-model="provinceVal" @change="getCity(provinceVal)">
                <option value="">请选择省</option>
                <option :value="item.name" v-for="item in province">{{item.name}}</option>
            </select>
            <select class="u-select w15" v-model="cityVal" @change="getDistrict(cityVal)">
                <option value="">请选择市</option>
                <option :value="item.name" v-for="item in city">{{item.name}}</option>
            </select>
            <select class="u-select w15" v-model="districtVal" @change="getTrade(districtVal)">
                <option value="">请选择区</option>
                <option :value="item.name" v-for="item in district">{{item.name}}</option>
            </select>
            <select class="u-select w15" v-model="tradeVal" @blur="getPlace" @change="getRegion(tradeVal)">
                <option value="">请选择商圈</option>
                <option :value="item.name" v-for="item in trade">{{item.name}}</option>
            </select>
            <input 
                class="u-input-text w40" 
                type="text" 
                placeholder="请输入详细地址" 
                v-model.trim="address" 
                @blur="$v.address.$touch()"
                @focus="$v.address.$reset()" />
            <div class="m-form-item__text">
                <span class="f-c-red">{{address.length || 0}}/40</span>字
            </div>
        </ui-form-item>
        <ui-form-item 
            label="E-mail：" 
            :tips="getErrorText($v.contactMail, msg.contactMail)" 
            :state="$v.contactMail.$error">
            <input 
                class="u-input-text w50" 
                type="text" 
                placeholder="请填写email" 
                v-model="contactMail" 
                @blur="$v.contactMail.$touch()"
                @focus="$v.contactMail.$reset()" />
        </ui-form-item>
        <ui-form-item 
            label="联系电话：" 
            :tips="getErrorText($v.telephone, msg.telephone)" 
            :state="$v.telephone.$error" 
        >
            <input 
                class="u-input-text w50" 
                type="text" 
                placeholder="请填写联系电话" 
                v-model="telephone" 
                @blur="$v.telephone.$touch()"
                @focus="$v.telephone.$reset()" />
        </ui-form-item>
        <ui-form-item 
            label="机构图片："
            :tips="getErrorText($v.pics, msg.pics)"
            :state="$v.pics.$error">
            <ui-form-upload-imgs 
                :items="pics"
                @remove="removeImg"
                @mounted="initUploadImg"></ui-form-upload-imgs>
                <p style="margin:10px 0 0 0;">建议尺寸1080*674</p>
        </ui-form-item>
        <ui-form-item 
            label="负责人：" 
            :required="true"
            :tips="getErrorText($v.contactName, msg.contactName)" 
            :state="$v.contactName.$error">
            <input 
                class="u-input-text w50" 
                type="text" 
                placeholder="请填写负责人" 
                v-model="contactName" 
                @blur="$v.contactName.$touch()"
                @focus="$v.contactName.$reset()" />
        </ui-form-item>
        <ui-form-item 
            label="负责人电话：" 
            :required="true"
            :tips="getErrorText($v.contactPhone, msg.contactPhone)" 
            :state="$v.contactPhone.$error">
            <input 
                class="u-input-text w50" 
                type="text" 
                placeholder="请填写负责人电话" 
                v-model="contactPhone" 
                @blur="$v.contactPhone.$touch()"
                @focus="$v.contactPhone.$reset()" />
        </ui-form-item>
        <ui-form-item>
            <ui-button type="primary" @click.native="submit">提交</ui-button>
        </ui-form-item>
    </ui-form>
    <!--已选网店-->
    <ui-form type="v" v-else>
        <ui-form-item 
            label="网店名称：" 
            :required="true">
            {{groupName}}
            <ui-button type="primary" @click.native="reSelect">重置</ui-button>
        </ui-form-item>
        <template v-if="info">
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
                {{fullAddress}}
            </ui-form-item>
            <ui-form-item label="Email：">
                {{info.contactMail}}
            </ui-form-item>
            <ui-form-item label="联系电话：">
                {{info.telephone}}
            </ui-form-item>
            <ui-form-item label="机构图片：">
                <div class="m-form-upload-img" v-for="(item,index) of info.pics">
                    <div class="img">
                        <img :src="item.uri">
                    </div>
                </div>
            </ui-form-item>
            <ui-form-item label="负责人：">
                {{info.contactName}}
            </ui-form-item>
            <ui-form-item label="负责人电话：">
                {{info.contactPhone}}
            </ui-form-item>
        </template>
        <div v-else>
            正在加载信息...
        </div>
        <ui-form-item>
            <ui-button type="primary" @click.native="submit">提交</ui-button>
        </ui-form-item>
    </ui-form>
</div>