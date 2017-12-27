import Crypto from 'crypto-js';

/**
 * JS加解密工具类
 *
 * @param addTime 2017-12-21
 * @param author  ChengBo
 */
class CryptoJS {
	/**
	 * 加密数据
	 *
	 * @param String data 明文字符串
	 *
	 * return String 加密后的字符串
	 */
	 static encodeAES(data){
		var key	= Crypto.enc.Latin1.parse('1234567812345678');
		var iv	= Crypto.enc.Latin1.parse('1234567812345678');  
		
		//加密
		var encrypted = Crypto.AES.encrypt(data, key,{
			iv: iv,
			mode:Crypto.mode.CBC,
			padding:Crypto.pad.ZeroPadding
		});

		return encrypted+'';
	 }
	 
	/**
	 * 解密数据
	 *
	 * @param String data 密文字符串
	 *
	 * return JsonObject 解密后的字符串
	 */
	 static decodeAES(data){
		var key	= Crypto.enc.Latin1.parse('1234567812345678');
		var iv	= Crypto.enc.Latin1.parse('1234567812345678');  

		//解密
		var decrypted = Crypto.AES.decrypt(data, key,{
			iv: iv,
			padding: Crypto.pad.ZeroPadding
		});
		
		return JSON.parse(decrypted.toString(Crypto.enc.Utf8));
	 }
}

export default CryptoJS;