use crate::modules::shared::printing::domain::printer::PrinterRepository;
use thermoprint::{ReceiptBuilder, PrintWidth};
use image::{RgbaImage, Rgba, DynamicImage};

pub struct PrintHelloWorldUseCase<R: PrinterRepository> {
    printer_repository: R,
}

impl<R: PrinterRepository> PrintHelloWorldUseCase<R> {
    pub fn new(printer_repository: R) -> Self {
        Self { printer_repository }
    }

    pub fn execute(&self, printer_name: &str) -> Result<(), String> {
        // En lugar de usar `.init()` que mete 3 saltos de línea basura (afectando la altura),
        // metemos a mano los comandos ESC/POS de Limpieza y Configuración de Caracteres aquí arriba.
        let mut final_payload: Vec<u8> = vec![
            0x1B, 0x40,       // ESC @ : Initialize printer
            0x1B, 0x74, 19,   // ESC t 19 : Select Code Page 858 (acentos y ñ)
        ];

        let mut builder = ReceiptBuilder::new(PrintWidth::Mm80)
            .align_center();
            
        // Usamos la capa de procesamiento de imagenes custom con caja de pintura blanca
        builder = match image::open("icons/logo.png") {
            Ok(img) => {
                let img_rgba = img.to_rgba8();
                // Creamos un fondo blanco del mismo tamaño
                let mut bg = RgbaImage::from_pixel(img_rgba.width(), img_rgba.height(), Rgba([255, 255, 255, 255]));
                // Pintamos la imagen encima (esto rellenará todo lo transparente de blanco real)
                image::imageops::overlay(&mut bg, &img_rgba, 0, 0);
                
                // Ahora usamos el comando de dither de thermoprint con 576 px de maximo
                let raster = thermoprint::image::rasterise(&DynamicImage::ImageRgba8(bg), 576);
                builder.logo_raw(&raster)
            },
            Err(e) => {
                println!("[PrinterService] No se pudo cargar el logo manual: {}", e);
                builder
            }
        };

        // Construir el resto del ticket
        let bytes = builder
            .bold(true)
            .double_size(true)
            .text_line("HELLO WORLD")
            .bold(false)
            .normal_size()
            .text_line("Tauri POS System")
            .divider('-')
            .text_line("Prueba de impresión exitosa")
            .cut() // Removimos el feed(3) porque cut() ya hace roll hasta la navaja
            .build();

        // Juntamos manualmente los bytes de inicio con el ticket generado 
        final_payload.extend(bytes);

        // Print using the repository
        self.printer_repository.print_raw(printer_name, &final_payload)
    }
}
