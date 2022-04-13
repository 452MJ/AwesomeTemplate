import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { apx } from "../utils/device";
import codePush, { DownloadProgress, LocalPackage, RemotePackage } from "react-native-code-push";
import Modal from "react-native-modal";
import DeviceInfo from "react-native-device-info";
import ProgressBar from "./ProgressBar";
import Button from "./Button";
import Touchable from "./Touchable";

const ModalCodePush = forwardRef((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [patch, setPatch] = useState<RemotePackage | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [downloading, setDownloading] = useState<boolean>(false);

  useEffect(() => {
    check();
  });

  const check = async (showTips = false) => {
    try {
      // if (showTips) {
      //   $loading.show(true)
      // }

      await codePush.notifyAppReady();

      const latestPatch: RemotePackage | null = await codePush.checkForUpdate();

      $loading.hide();
      if (latestPatch === null) {
        // 无更新包
        if (showTips) {
          $toast.show(
            $i18n.translation(
              '当前已是最新版本',
              '當前已是最新版本',
              'It is currently the latest version.',
            ),
          );
        }
      } else {
        const isSilent: boolean =
          latestPatch.description?.indexOf('silent') === 0;

        setPatch(() => latestPatch);
        setVisible(() => isSilent === false);
        if (isSilent) {
          startDownload(true);
        }
      }
    } catch (e) {
      $loading.hide();
      if (showTips) {
        $toast.show(
          $i18n.translation(
            '检测新版本失败',
            '檢測新版本失敗',
            'Failed to check the new version.',
          ),
        );
      }
    }
  };

  const startDownload = async (silent: boolean = false) => {
    !silent && setDownloading(true);

    if (!patch) {
      return;
    }
    const newPatch: LocalPackage | null = await patch
      .download((downloadProgress: DownloadProgress) => {
        if (!silent) {
          setCurrent(
            Number((downloadProgress.receivedBytes / (1024 * 1024)).toFixed(2)),
          );
          setTotal(
            Number((downloadProgress.totalBytes / (1024 * 1024)).toFixed(2)),
          );
          setProgress(
            downloadProgress.receivedBytes / downloadProgress.totalBytes,
          );
          setDownloading(true);
        }
      })
      .catch(() => {
        if (!silent) {
          setCurrent(0);
          setTotal(0);
          setProgress(0);
          setVisible(false), setDownloading(false);
        }
        return null;
      });

    setVisible(false);
    setDownloading(false);
    if (!newPatch) {
      return;
    }
    newPatch
      .install(
        silent
          ? codePush.InstallMode.ON_NEXT_SUSPEND
          : codePush.InstallMode.IMMEDIATE,
      )
      .then(() => {
        codePush.allowRestart();
        !silent && codePush.restartApp();
      })
      .catch(err => {
        console.log(err);
      });
  };

  useImperativeHandle(ref, () => ({
    check: () => {
      check();
    },
  }));

  return (
    <Modal
      isVisible={visible}
      style={{
        margin: 0,
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      useNativeDriver>
      <View
        style={{
          top: apx(-1),
          width: apx(560),
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: apx(20),
        }}>
        <Text
          style={{
            fontSize: apx(36),
            fontWeight: '500',
            marginTop: apx(20),
            color: '#FEBE18',
          }}>
          发现新版本
        </Text>
        <Text
          style={{
            fontSize: apx(22),
            marginVertical: apx(20),
            color: '#323F4B',
          }}>
          新版本 {DeviceInfo.getVersion()} ({patch?.label})
        </Text>

        {downloading ? (
          <View style={{marginBottom: apx(48)}}>
            <Text
              style={{
                textAlign: 'center',
                marginBottom: apx(20),
                fontSize: apx(26),
                color: '#617485',
              }}>
              {current}MB / {total}MB
            </Text>
            <ProgressBar
              progress={progress}
              activeColor="#FEBE18"
              width={apx(452)}
              height={apx(20)}
            />
          </View>
        ) : (
          <View style={{alignItems: 'center', paddingBottom: apx(32)}}>
            <Button
              text="立即更新"
              theme="gold"
              contentContainerStyle={{width: apx(452), height: apx(80)}}
              textStyle={{fontSize: apx(26)}}
              onPress={startDownload}
            />

            {patch?.isMandatory === false && (
              <Touchable
                contentContainerStyle={{
                  width: apx(452),
                  paddingVertical: apx(30),
                  alignItems: 'center',
                }}
                onPress={() => setVisible(false)}>
                <Text
                  style={{
                    fontSize: apx(26),
                    color: '#FEBE18',
                    textAlign: 'center',
                  }}>
                  稍后更新
                </Text>
              </Touchable>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
});

export default connect(state => state, null, null, {forwardRef: true})(
  ModalCodePush,
);
