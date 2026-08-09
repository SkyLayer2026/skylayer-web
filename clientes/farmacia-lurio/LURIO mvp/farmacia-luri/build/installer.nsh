!macro preInit
  SetRegView 64
  WriteRegDWORD HKLM "Software\${PRODUCT_PUBLISHER}\${PRODUCT_NAME}" "InstallDate" "$(^DATE)"
  SetRegView 32
  WriteRegDWORD HKLM "Software\${PRODUCT_PUBLISHER}\${PRODUCT_NAME}" "InstallDate" "$(^DATE)"
!macroend

!macro customInstall
  ; Adicione aqui comandos personalizados pós-instalação, se necessário
!macroend

!macro customUninstall
  ; Adicione aqui comandos personalizados de desinstalação, se necessário
!macroend
