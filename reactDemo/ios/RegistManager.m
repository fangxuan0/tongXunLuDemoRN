//
//  RegistManager.m
//  reactDemo
//
//  Created by 司伟红 on 2018/6/12.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RegistManager.h"
#import <React/RCTConvert.h>
#import <React/RCTEventDispatcher.h>

@interface RegistManager ()<UIImagePickerControllerDelegate, UINavigationControllerDelegate,RCTBridgeModule>

@end

@implementation RegistManager

RCT_EXPORT_MODULE();
//桥接到Javascript的方法返回值类型必须是void。React Native的桥接操作是异步的，所以要返回结果给Javascript，必须通过回调或者触发事件来进行
RCT_EXPORT_METHOD(openImagePicker) {
  [self showPhotoChooseSheetWithTitle:@"" message:@"选择头像"];
}

- (void)showPhotoChooseSheetWithTitle:( NSString *)title message:( NSString *)message {
  NSLog(@"xxxxxxxxxxxxxx");
  //打开拍照
  void(^cameraBlock)() = ^(){
    UIImagePickerController *upc = [[UIImagePickerController alloc] init];
    upc.videoQuality = UIImagePickerControllerQualityTypeMedium;
    upc.delegate = self;
    upc.allowsEditing = NO;
    
    //拍照
    upc.sourceType = UIImagePickerControllerSourceTypeCamera;
    [self presentViewController:upc animated:YES completion:nil];
  };
  
  //系统相册
  void(^photoBlock)() = ^(){
    UIImagePickerController *upc = [[UIImagePickerController alloc] init];
    upc.videoQuality = UIImagePickerControllerQualityTypeMedium;
    upc.delegate = self;
    upc.allowsEditing = NO;
    //系统相册
    upc.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
    [self presentViewController:upc animated:YES completion:nil];
  };
  NSArray *array = @[ @{@"拍摄":cameraBlock}, @{@"系统相册":photoBlock} ];
  [self showAlertWithTitle:title message:message array:array cancleBlock:nil]; }

-(void)showAlertWithTitle:( NSString *)title message:( NSString *)message array:(NSArray <NSDictionary *>*)array cancleBlock:(void(^)())cancleBlock {
  UIAlertController *alertVC = [UIAlertController alertControllerWithTitle:title message:message preferredStyle:UIAlertControllerStyleAlert];
  for (NSDictionary *dict in array) {
    NSString *actionTitle = [[dict allKeys] lastObject];
    void(^sureBlock)() = [[[dict allValues] lastObject] isKindOfClass:[NSNumber class]] ? nil:[[dict allValues] lastObject];
    [alertVC addAction:[UIAlertAction actionWithTitle:actionTitle style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
      if (sureBlock) {
        sureBlock();
      }
    }]];
  }
  [alertVC addAction:[UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
    if (cancleBlock) {
      cancleBlock();
    }
  }]];
  
//  [[UIApplication sharedApplication].keyWindow.rootViewController presentViewController:alertVC animated:YES completion:nil];
  [self presentViewController:alertVC animated:YES completion:nil];
}

#pragma mark - UIImagePickerControllerDelegate
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info {
  [picker dismissViewControllerAnimated:NO completion:^{
    
  }];
}
  

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
