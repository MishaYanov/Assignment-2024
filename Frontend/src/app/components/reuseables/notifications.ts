import { notify } from "easy-notify-vanilla";
type INotifyPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";
type INotifyType = "success" | "error" | "warning" | "info";

export function invokeNotification(type:INotifyType, message: string){
    const config = {position: "top-right" as INotifyPosition, timeout: 3000, isCloseButton: true, isProgress: true, isIcon: true, height: 60, width: 300};

    notify({type, message}, config);
}