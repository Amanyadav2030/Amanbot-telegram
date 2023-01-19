import React, { useRef, useEffect } from 'react'
const TelegramWidgetLogin = ({ dataOnauth }) => {
    const ref = useRef(null)
    useEffect(() => {
        if (ref.current === null) return
        window.TelegramLoginWidget = {
            dataOnauth: (user) => dataOnauth(user)
        }
        const script = document.createElement('script')
        script.src = 'https://telegram.org/js/telegram-widget.js?21'
        script.setAttribute('data-telegram-login', "professorAman_bot")
        script.setAttribute('data-size', 'large')
        script.setAttribute('data-userpic', "false")
        script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)')
        script.async = true

        ref.current.append(script)
    }, [dataOnauth, ref])

    return <div ref={ref} ></div>
}


export default TelegramWidgetLogin