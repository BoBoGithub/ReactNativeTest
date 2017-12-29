<?php
	
//设置返回头格式
header("Content-Type: application/json;charset=utf-8");

error_reporting(0);

class TestFetchData {
	/**
	 *初始化
	 */
	public function init(){
		$ret['errno']		= 0;
		$ret['errmsg']	= 'success';
		$ret['data']		= '';

		echo json_encode($ret);
	}
	
	//获取最新的借款记录
	public function getLastLoan(){
		$ret['errno']		= 0;
		$ret['errmsg']	= 'success';
		
		if(time()%3 == 0){
			$data['userName'] 	= '156'.mt_rand(1000, 9999).mt_rand(1000, 9999);			
		}elseif(time()%3 == 1){
			$data['userName'] 	= '13'.mt_rand(2, 9).mt_rand(1000, 9999).mt_rand(1000, 9999);			
		}elseif(time()%3 == 2){
			$data['userName'] 	= '151'.mt_rand(1000, 9999).mt_rand(1000, 9999);			
		}else{
			$data['userName'] 	= '13'.mt_rand(2, 9).mt_rand(1000, 9999).mt_rand(1000, 9999);			
		}

		$data['borrowMoney']	= mt_rand(10, 100)*100;
		$ret['data'][]				= $data;

		$retData = json_encode($ret);
		
		$this->log('getLastLoan', $retData);
		
		echo $retData;
	}
	
	//问题返回提交
	public function postFeedBack(){
		$con = isset($_POST['con']) && !empty($_POST['con']) ? trim($_POST['con']) : '';
		if(empty($con)){
			$data['errno']		= '10001';
			$data['errmsg']	= 'param error';
			echo json_encode($data);exit;
		}
		
		$data['errno']		= '0';
		$data['errmsg']		= 'success';
		$data['data']['ret']	= 1;
		$ret = json_encode($data);
		
		//记录日志
		$this->log('postFeedBack', $ret .' Post: '.$con);
		
		echo $ret;
	}
	
	public function getProductList(){
		$data['errno']		= '0';
		$data['errmsg']		= 'success';
						
		$product[0] = array(
			array(
				'day'				=> '- ',
				'rePayMoney' => '- ',
				'income'		=> '- ',
				'charge'			=> '- '
			),
		);
		
		$product[500] = array(
			array(
				'day'				=> '- ',
				'rePayMoney' => '- ',
				'income'		=> '- ',
				'charge'			=> '- '
			),
			array(
				'day'				=> '7',
				'rePayMoney' => '524.5',
				'income'		=> '2.1',
				'charge'			=> '22.5'
			),
			array(
				'day'				=> '14',
				'rePayMoney' => '526.7',
				'income'		=> '4.2',
				'charge'			=> '22.5'
			),
		);
		
		$product[1000] = array(
			array(
				'day'				=> '- ',
				'rePayMoney' => '- ',
				'income'		=> '- ',
				'charge'			=> '- '
			),
			array(
				'day'				=> ' 7',
				'rePayMoney' => '1049.2',
				'income'		=> '4.2',
				'charge'			=> '45'
			),
			array(
				'day'				=> '14',
				'rePayMoney' => '1053.4',
				'income'		=> '8.4',
				'charge'			=> '45'
			),
			array(
				'day'				=> '30',
				'rePayMoney' => '1063',
				'income'		=> '18',
				'charge'			=> '45'
			),
		);
		
		$product[2000] = array(
			array(
				'day'				=> '- ',
				'rePayMoney' => '- ',
				'income'		=> '- ',
				'charge'			=> '- '
			),
			array(
				'day'				=> '14',
				'rePayMoney' => '2106.8',
				'income'		=> '16.8',
				'charge'			=> '90'
			),
			array(
				'day'				=> '30',
				'rePayMoney' => '2126',
				'income'		=> '36',
				'charge'			=> '90'
			),
		);		
		
		$data['data']	= $product;
		$ret = json_encode($data);
		
		//记录日志
		$this->log('getProductList', $ret);
		
		echo $ret;
	}
	
	public function userLogin(){
		$userName = isset($_POST['UserName']) && !empty($_POST['UserName']) ? trim($_POST['UserName']) : '';
		$passWord = isset($_POST['PassWord']) && !empty($_POST['PassWord']) ? trim($_POST['PassWord']) : '';		
		if(empty($userName) || empty($passWord)){
			$data['errno']		= '10001';
			$data['errmsg']	= 'param error';
			echo json_encode($data);exit;
		}
		
		if(preg_match('/^user/', $userName) && $passWord == '123456'){
				$data['errno']		= '0';
				$data['errmsg']		= 'success';
				$data['data']['realName']	 = '程先生.'.preg_replace('/user/', '', $userName);
		}elseif(preg_match('/^user/', $userName) && $passWord != '123456'){
				$data['errno']		= '10003';
				$data['errmsg']		= '密码错误';
		}else{
				$data['errno']		= '10002';
				$data['errmsg']		= '用户名或密码错误';
		}
		$ret = json_encode($data);
		
		//记录日志
		$this->log('userLogin', 'POST UserName: '. $userName.' PassWord: '. $passWord .' Return: '.$ret);
		
		echo $ret;
	}
	
	public function userReg(){
		$userName = isset($_POST['UserName']) && !empty($_POST['UserName']) ? trim($_POST['UserName']) : '';
		$passWord = isset($_POST['PassWord']) && !empty($_POST['PassWord']) ? trim($_POST['PassWord']) : '';		
		$mobileCode = isset($_POST['MobileCode']) && !empty($_POST['MobileCode']) ? trim($_POST['MobileCode']) : '';		
		if(empty($userName) || empty($passWord) || empty($mobileCode)){
			$data['errno']		= '10003';
			$data['errmsg']	= 'param error';
			echo json_encode($data);exit;
		}
		
		//检查验证码
		if(!preg_match('/^(13[0-9]|14[57]|15[012356789]|17[3678]|18[0-9])\d{8}$/', $userName)){
			$data['errno']		= '10005';
			$data['errmsg']		= '手机号错误';
		}elseif($mobileCode != 'abc123'){
			$data['errno']		= '10003';
			$data['errmsg']		= '验证码错误';
		}else{
			$data['errno']		= '0';
			$data['errmsg']		= 'success';
			$data['data']['realName']	 = substr($userName, 0, 3).'***'.substr($userName, 7);
		}
		
		$ret = json_encode($data);
		
		//记录日志
		$this->log('userReg', 'POST UserName: '. $userName.' PassWord: '. $passWord.' MobileCode: '. $mobileCode .' Return: '.$ret);
		
		echo $ret;
	}
	
	public function sendMobile(){
		$userName = isset($_POST['UserName']) && !empty($_POST['UserName']) ? trim($_POST['UserName']) : '';
		if(empty($userName)){
			$data['errno']		= '10003';
			$data['errmsg']	= 'param error';
			echo json_encode($data);exit;
		}
		
		//检查验证码
		if(!preg_match('/^(13[0-9]|14[57]|15[012356789]|17[3678]|18[0-9])\d{8}$/', $userName)){
			$data['errno']		= '10005';
			$data['errmsg']		= '手机号错误';
		}else{
			$data['errno']		= '0';
			$data['errmsg']		= 'success';
		}
			
		$ret = json_encode($data);
		
		//记录日志
		$this->log('sendMobile', 'POST UserName: '. $userName);
	
		echo $ret;
	}
	
	public function accessMobile(){
		$mobileData = isset($_POST['data']) && !empty($_POST['data']) ? trim($_POST['data']) : '';
		if(empty($mobileData)){
			$data['errno']		= '10001';
			$data['errmsg']	= 'param error';
			echo json_encode($data);exit;
		}
		
		$data['errno']		= '0';
		$data['errmsg']		= 'success';
		$data['data']['ret']= 1;
		$ret = json_encode($data);
		
		//记录日志
		$this->log('accessMobile', $ret .' Post: '.$mobileData);
		
		echo $ret;
	}
	
	public function uploadImg(){
		//上传头像
		$imgUrl = $this->dealUserPhoto($_FILES);
		
		$this->log('uploadImg', ' Post: '.var_export($_POST, true).' FILE: '.var_export($_FILES, true));

		$data['errno']		= '0';
		$data['errmsg']		= '上传成功！';
		$data['imgUrl']		= $imgUrl;
		echo json_encode($data);exit;
	}
	
	private function dealUserPhoto($fileObj){
		$file = $fileObj['file'];//得到传输的数据
		
		//得到文件名称
		$name = $file['name'];
		$type = strtolower(substr($name,strrpos($name,'.')+1)); //得到文件类型，并且都转化成小写
		$allow_type = array('jpg','jpeg','gif','png'); //定义允许上传的类型
		
		//判断文件类型是否被允许上传
		if(!in_array($type, $allow_type)){
			$data['errno']		= '10003';
			$data['errmsg']		= '上传的文件格式错误！';
			echo json_encode($data);exit;
		}
		
		//判断是否是通过HTTP POST上传的
		if(!is_uploaded_file($file['tmp_name'])){
			$data['errno']		= '10004';
			$data['errmsg']		= '上传的文件格式错误！！';
			echo json_encode($data);exit;
		}
		
		$upload_path = "/var/www/react/data/TestMT01/img/"; //上传文件的存放路径
		$fileName = md5(mt_rand(100, 999).'_'.$file['name'].'_'.time()).'.'.$type;
		//开始移动文件到相应的文件夹
		if(!move_uploaded_file($file['tmp_name'], $upload_path.$fileName)){
			$data['errno']		= '10005';
			$data['errmsg']		= '上传的文件失败！！';
			echo json_encode($data);exit;
		}
		
		//记录图片地址
		$this->log('dealUserPhoto', 'http://172.16.1.95/react/data/TestMT01/img/'.$fileName);
		
		return 'http://172.16.1.95/react/data/TestMT01/img/'.$fileName;
	}
	
	//记录日志
	private function log($method, $data){
		//记录日志
		file_put_contents('./access.log', 'Date: '.date('Y-m-d H:i:s').' IP:'.(isset($_SERVER["REMOTE_ADDR"])?$_SERVER["REMOTE_ADDR"]:'').' Method: '.$method. ' RetData: '.$data.PHP_EOL, FILE_APPEND);	
	}
	
}

$class		= new TestFetchData();
if(isset($_GET['act']) && !empty($_GET['act'])){
	$method = trim($_GET['act']);
}elseif(isset($_POST['act']) && !empty($_POST['act'])){
	$method = trim($_POST['act']);
}else{
	$method = 'init';
}
//$method	= isset($_GET['act']) && !empty($_GET['act']) ? trim($_GET['act']) : 'init';

call_user_func(array($class, $method));
?>