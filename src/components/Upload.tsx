import { mainUrl } from "@/config";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

import {Upload as _Upload} from '@arco-design/web-react'
import { useEventListener } from "ahooks";

const Upload = ({onChange, className, resetEventName}: any) => {
    useEventListener(resetEventName, ()=>{
        setFileList([])
    })

    const [fileList, setFileList] = useState([]);
    const uploadRef = useRef<any>();

    const onSubmit = () => {
        const file = fileList.filter((x: any) => x.status === 'init')[0];
        uploadRef.current && uploadRef.current.submit(file);
      };

    const _onChange = (files) => {
        console.log('_onChange', files)
        setFileList(files);
    };

    useEffect(()=>{
        if(fileList){
            onSubmit?.()
        }
    }, [fileList?.map(i=>i?.uid)?.toString()])

    // [
    //   {
    //       "uid": "17158760617440",
    //       "originFile": {},
    //       "percent": 100,
    //       "status": "error",
    //       "name": "avatar.png",
    //       "response": ""
    //   }
    // ]
    const handleImgChange = async (option: any) => {
        console.log('option', option)
        const { onProgress, onError, onSuccess, file } = option;
        const xhr = new XMLHttpRequest();

        if (xhr.upload) {
            xhr.upload.onprogress = function (event) {
                let percent: any;

                if (event.total > 0) {
                    percent = (event.loaded / event.total) * 100;
                }

                onProgress(parseInt(percent, 10), event);
            };
        }

        xhr.onerror = function error(e: any) {
            console.log('error', e)
            toast.error(e?.response?.data?.msg || e?.message || 'Upload Failed')
            onError(e);
        };

        xhr.onload = function onload() {
            if (xhr.status < 200 || xhr.status >= 300) {
                const e = JSON.parse(xhr.responseText)
                toast.error('Upload Failed: ' + e?.msg)
                return onError(xhr.responseText);
            }

            const res = JSON.parse(xhr.responseText)
            toast.success('Success')
            onChange()
            onChange?.(res?.data)
            onSuccess(xhr.responseText, xhr);
        };

        const formData = new FormData();
        formData.append(name || 'file', file);
        xhr.open('post', mainUrl + '/api/v1/upload', true);
        xhr.send(formData);
        return {
            abort() {
                xhr.abort();
            },
        };
    }

    return (<_Upload
        ref={uploadRef}
        onChange={_onChange}
        // onProgress={onProgress}
        fileList={fileList}
        autoUpload={false}
        customRequest={handleImgChange}
        className={clsx("size-[6rem]","rounded-[8px]", className)}
        limit={1}
        imagePreview
        // action='/'
        listType='picture-card'
        onPreview={(file) => {
            console.log('file', file)
        }}
    />)
}

export default Upload