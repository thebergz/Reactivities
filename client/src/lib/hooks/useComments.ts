import {useLocalObservable} from "mobx-react-lite";
import {HubConnection, HubConnectionBuilder, HubConnectionState} from "@microsoft/signalr";
import {useEffect, useRef} from "react";
import type {ChatComment} from "../types";
import {runInAction} from "mobx";

export const useComments = (activityId?: string) => {
    const created = useRef(false); //Refs do NOT get modified by the hook - only at create time. But can still be modified in OUR code
    const commentStore = useLocalObservable(() => ({
        comments: [] as ChatComment[],
        hubConnection: null as HubConnection | null,

        createHubConnection(activityId: string) {
            if (!activityId) return;

            this.hubConnection = new HubConnectionBuilder()
                .withUrl(`${import.meta.env.VITE_COMMENTS_URL}?activityId=${activityId}`, {
                    withCredentials: true
                })
                .withAutomaticReconnect()
                .build();

            this.hubConnection.start().catch(error =>
                console.log('Error establishing connection', error));

            //runInAction wrapper below is required to overcome the strictMode limitation mentioned in this console warning:
            //[MobX] Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: ObservableObject@3.comments
            this.hubConnection.on('LoadComments', comments => {
                runInAction(() => {
                    this.comments = comments;
                });
            });

            this.hubConnection.on('ReceiveComment', comment => {
                runInAction(() => {
                    this.comments.unshift(comment);
                })
            })
        },

        stopHubConnection() {
            if (this.hubConnection?.state === HubConnectionState.Connected) {
                this.hubConnection.stop().catch(error =>
                    console.log('Error stopping connection: ', error));
            }
        }
    }));

    useEffect(() => {
        if (activityId && !created.current) {
            created.current = true; //This handles the development environment where hooks are called twice due to strictMode being ON. In this case 2 SignalR calls are made until we add this to stop it.
            commentStore.createHubConnection(activityId);
        }

        return () => {
            commentStore.stopHubConnection();
            commentStore.comments = [];
        }
    }, [activityId, commentStore]);

    return {
        commentStore
    }
}