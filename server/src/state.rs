
/// The app state consists of the mode the app is currently in and the DMX universe
/// the app operates in at the current moment. 
pub struct AppState{
    mode: Mode,
    universe: Universe
}
/// The app can either be in programming mode or in play mode. In each of those
/// modes the app uses or manipulates some programmable data structure such as
/// a cyclical program or some timecode program. The distinction of the two modes
/// is necessary in order to prevent different users from attempting to create
/// a new program while another one is running and thus producing unwanted output
/// to the fixtures.
pub enum Mode<T: Program>{
    Programming(T),
    Play(T),
}