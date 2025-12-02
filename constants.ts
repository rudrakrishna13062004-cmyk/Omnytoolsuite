import { 
  Calculator, DollarSign, Scale, Cake, Activity, 
  Utensils, Timer, Lock, Type, Palette,
  Hourglass, QrCode, FileText, AlignJustify, Maximize,
  CalendarClock, Landmark, Code, Shield, Music,
  ALargeSmall, Binary, Dices, Gamepad2, Layers, Link, 
  Shuffle, Radio, Fingerprint, BoxSelect,
  // Existing Icons
  FileDiff, PenTool, Keyboard, Globe, GraduationCap, 
  Box, Percent, Hash, Link2, Tag,
  // New Icons
  Shapes, Image, Droplet, Wind, CalendarDays, 
  Terminal, Smile, FileCode, Unlock, Zap,
  // PDF Icons
  FileStack, Images, RotateCw, Stamp, Hash as HashIcon, 
  FileCog, FileLock, FileKey, FileMinus, Scissors
} from 'lucide-react';
import { ToolDef, ToolCategory } from './types';

// Components
import ScientificCalculator from './components/tools/ScientificCalculator';
import FinanceCalculator from './components/tools/FinanceCalculator';
import UnitConverter from './components/tools/UnitConverter';
import AgeCalculator from './components/tools/AgeCalculator';
import BMICalculator from './components/tools/BMICalculator';
import TipCalculator from './components/tools/TipCalculator';
import Stopwatch from './components/tools/Stopwatch';
import PasswordGenerator from './components/tools/PasswordGenerator';
import TextAnalyzer from './components/tools/TextAnalyzer';
import ColorConverter from './components/tools/ColorConverter';
import PomodoroTimer from './components/tools/PomodoroTimer';
import QRCodeGenerator from './components/tools/QRCodeGenerator';
import LoanCalculator from './components/tools/LoanCalculator';
import MarkdownPreview from './components/tools/MarkdownPreview';
import UnixConverter from './components/tools/UnixConverter';
import AspectRatioCalculator from './components/tools/AspectRatioCalculator';
import JsonFormatter from './components/tools/JsonFormatter';
import HashGenerator from './components/tools/HashGenerator';
import LoremIpsumGenerator from './components/tools/LoremIpsumGenerator';
import Metronome from './components/tools/Metronome';
import CaseConverter from './components/tools/CaseConverter';
import Base64Converter from './components/tools/Base64Converter';
import NumberBaseConverter from './components/tools/NumberBaseConverter';
import DiceRoller from './components/tools/DiceRoller';
import ReactionTime from './components/tools/ReactionTime';
import BoxShadowGenerator from './components/tools/BoxShadowGenerator';
import UrlEncoder from './components/tools/UrlEncoder';
import ListRandomizer from './components/tools/ListRandomizer';
import MorseConverter from './components/tools/MorseConverter';
import UuidGenerator from './components/tools/UuidGenerator';

// Set 4 Components
import DiffViewer from './components/tools/DiffViewer';
import SignaturePad from './components/tools/SignaturePad';
import KeycodeInfo from './components/tools/KeycodeInfo';
import WorldClock from './components/tools/WorldClock';
import GradeCalculator from './components/tools/GradeCalculator';
import BorderRadiusGenerator from './components/tools/BorderRadiusGenerator';
import PercentageCalculator from './components/tools/PercentageCalculator';
import RomanConverter from './components/tools/RomanConverter';
import SlugGenerator from './components/tools/SlugGenerator';
import MetaTagGenerator from './components/tools/MetaTagGenerator';

// Set 5 Components (New)
import JwtDecoder from './components/tools/JwtDecoder';
import BlobGenerator from './components/tools/BlobGenerator';
import ImageCompressor from './components/tools/ImageCompressor';
import GradientGenerator from './components/tools/GradientGenerator';
import GlassmorphismGenerator from './components/tools/GlassmorphismGenerator';
import TypingTest from './components/tools/TypingTest';
import BinaryConverter from './components/tools/BinaryConverter';
import DateDifference from './components/tools/DateDifference';
import HtmlEntityEncoder from './components/tools/HtmlEntityEncoder';
import EmojiPickerTool from './components/tools/EmojiPickerTool';

// PDF Components
import PdfMerger from './components/tools/PdfMerger';
import ImagesToPdf from './components/tools/ImagesToPdf';
import PdfRotator from './components/tools/PdfRotator';
import PdfWatermark from './components/tools/PdfWatermark';
import PdfPageNumbers from './components/tools/PdfPageNumbers';
import PdfMetadata from './components/tools/PdfMetadata';
import PdfProtect from './components/tools/PdfProtect';
import PdfUnlock from './components/tools/PdfUnlock';
import PdfDeletePages from './components/tools/PdfDeletePages';
import PdfSplitter from './components/tools/PdfSplitter';

export const TOOLS: ToolDef[] = [
  // --- PDF Tools ---
  {
    id: 'pdf-merge',
    name: 'Merge PDF',
    description: 'Combine multiple PDF files into one.',
    icon: FileStack,
    category: ToolCategory.PDF,
    component: PdfMerger
  },
  {
    id: 'img-to-pdf',
    name: 'Images to PDF',
    description: 'Convert JPG/PNG images to a PDF file.',
    icon: Images,
    category: ToolCategory.PDF,
    component: ImagesToPdf
  },
  {
    id: 'pdf-rotate',
    name: 'Rotate PDF',
    description: 'Rotate PDF pages permanently.',
    icon: RotateCw,
    category: ToolCategory.PDF,
    component: PdfRotator
  },
  {
    id: 'pdf-watermark',
    name: 'Watermark PDF',
    description: 'Add text stamps/watermarks to pages.',
    icon: Stamp,
    category: ToolCategory.PDF,
    component: PdfWatermark
  },
  {
    id: 'pdf-numbers',
    name: 'Page Numbers',
    description: 'Add numbering to PDF pages.',
    icon: HashIcon,
    category: ToolCategory.PDF,
    component: PdfPageNumbers
  },
  {
    id: 'pdf-metadata',
    name: 'Edit Metadata',
    description: 'Change Title, Author, and Keywords.',
    icon: FileCog,
    category: ToolCategory.PDF,
    component: PdfMetadata
  },
  {
    id: 'pdf-protect',
    name: 'Protect PDF',
    description: 'Encrypt PDF with a password.',
    icon: FileLock,
    category: ToolCategory.PDF,
    component: PdfProtect
  },
  {
    id: 'pdf-unlock',
    name: 'Unlock PDF',
    description: 'Remove password from PDF.',
    icon: FileKey,
    category: ToolCategory.PDF,
    component: PdfUnlock
  },
  {
    id: 'pdf-delete',
    name: 'Delete Pages',
    description: 'Remove specific pages from PDF.',
    icon: FileMinus,
    category: ToolCategory.PDF,
    component: PdfDeletePages
  },
  {
    id: 'pdf-split',
    name: 'Split PDF',
    description: 'Extract range of pages to new file.',
    icon: Scissors,
    category: ToolCategory.PDF,
    component: PdfSplitter
  },

  // --- Math & Finance ---
  {
    id: 'calc',
    name: 'Scientific Calculator',
    description: 'Advanced math operations with history.',
    icon: Calculator,
    category: ToolCategory.MATH,
    component: ScientificCalculator
  },
  {
    id: 'finance',
    name: 'Investment Calculator',
    description: 'Project your savings growth with compound interest.',
    icon: DollarSign,
    category: ToolCategory.MATH,
    component: FinanceCalculator
  },
  {
    id: 'loan',
    name: 'Loan Calculator',
    description: 'Calculate monthly payments and amortization.',
    icon: Landmark,
    category: ToolCategory.MATH,
    component: LoanCalculator
  },
  {
    id: 'numberbase',
    name: 'Number Base',
    description: 'Convert Decimal, Binary, Hex, and Octal.',
    icon: Binary,
    category: ToolCategory.MATH,
    component: NumberBaseConverter
  },
  {
    id: 'grade',
    name: 'Grade Calculator',
    description: 'Calculate weighted averages for classes.',
    icon: GraduationCap,
    category: ToolCategory.MATH,
    component: GradeCalculator
  },
  {
    id: 'percentage',
    name: 'Percentage Calc',
    description: 'Calculate increases, decreases and parts.',
    icon: Percent,
    category: ToolCategory.MATH,
    component: PercentageCalculator
  },

  // --- Converters ---
  {
    id: 'unit',
    name: 'Unit Converter',
    description: 'Convert between Length, Weight, and Data units.',
    icon: Scale,
    category: ToolCategory.CONVERTERS,
    component: UnitConverter
  },
  {
    id: 'color',
    name: 'Color Converter',
    description: 'Translate between HEX, RGB, and HSL formats.',
    icon: Palette,
    category: ToolCategory.CONVERTERS,
    component: ColorConverter
  },
  {
    id: 'aspect',
    name: 'Aspect Ratio Calc',
    description: 'Calculate dimensions and ratios for screens.',
    icon: Maximize,
    category: ToolCategory.CONVERTERS,
    component: AspectRatioCalculator
  },
  {
    id: 'morse',
    name: 'Morse Code',
    description: 'Translate text to dots and dashes.',
    icon: Radio,
    category: ToolCategory.CONVERTERS,
    component: MorseConverter
  },
  {
    id: 'roman',
    name: 'Roman Numerals',
    description: 'Convert between Integer and Roman.',
    icon: Hash,
    category: ToolCategory.CONVERTERS,
    component: RomanConverter
  },
  {
    id: 'binary',
    name: 'Binary Converter',
    description: 'Translate text to 010101 binary strings.',
    icon: Terminal,
    category: ToolCategory.CONVERTERS,
    component: BinaryConverter
  },

  // --- Design ---
  {
    id: 'gradient',
    name: 'Gradient Generator',
    description: 'Create beautiful CSS gradients.',
    icon: Droplet,
    category: ToolCategory.DESIGN,
    component: GradientGenerator
  },
  {
    id: 'blob',
    name: 'Blob Generator',
    description: 'Generate organic SVG blob shapes.',
    icon: Shapes,
    category: ToolCategory.DESIGN,
    component: BlobGenerator
  },
  {
    id: 'glass',
    name: 'Glassmorphism',
    description: 'Generate frosted glass CSS effects.',
    icon: Wind,
    category: ToolCategory.DESIGN,
    component: GlassmorphismGenerator
  },
  {
    id: 'shadow',
    name: 'CSS Shadow',
    description: 'Visually generate CSS box-shadows.',
    icon: Layers,
    category: ToolCategory.DESIGN,
    component: BoxShadowGenerator
  },
  {
    id: 'border',
    name: 'CSS Border Radius',
    description: 'Generate advanced border-radius shapes.',
    icon: Box,
    category: ToolCategory.DESIGN,
    component: BorderRadiusGenerator
  },
  {
    id: 'compress',
    name: 'Image Compressor',
    description: 'Compress images locally in your browser.',
    icon: Image,
    category: ToolCategory.DESIGN,
    component: ImageCompressor
  },

  // --- Health & Daily ---
  {
    id: 'bmi',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index.',
    icon: Activity,
    category: ToolCategory.HEALTH,
    component: BMICalculator
  },
  {
    id: 'age',
    name: 'Age Calculator',
    description: 'Calculate exact age in years, months and days.',
    icon: Cake,
    category: ToolCategory.HEALTH,
    component: AgeCalculator
  },
  {
    id: 'date-diff',
    name: 'Date Difference',
    description: 'Calculate days between two dates.',
    icon: CalendarDays,
    category: ToolCategory.HEALTH,
    component: DateDifference
  },
  {
    id: 'stopwatch',
    name: 'Stopwatch',
    description: 'Precise timer with lap recording.',
    icon: Timer,
    category: ToolCategory.HEALTH,
    component: Stopwatch
  },
  {
    id: 'pomodoro',
    name: 'Pomodoro Timer',
    description: 'Focus timer for productivity techniques.',
    icon: Hourglass,
    category: ToolCategory.HEALTH,
    component: PomodoroTimer
  },
  {
    id: 'worldclock',
    name: 'World Clock',
    description: 'View current time in major cities.',
    icon: Globe,
    category: ToolCategory.HEALTH,
    component: WorldClock
  },
  {
    id: 'tip',
    name: 'Tip Calculator',
    description: 'Split bills and calculate tips easily.',
    icon: Utensils,
    category: ToolCategory.HEALTH,
    component: TipCalculator
  },
  {
    id: 'metronome',
    name: 'Metronome',
    description: 'Keep the beat with visual and audio cues.',
    icon: Music,
    category: ToolCategory.HEALTH,
    component: Metronome
  },
  {
    id: 'dice',
    name: 'Dice Roller',
    description: 'Roll up to 6 virtual dice instantly.',
    icon: Dices,
    category: ToolCategory.HEALTH,
    component: DiceRoller
  },
  {
    id: 'reaction',
    name: 'Reaction Time',
    description: 'Test your reflexes in milliseconds.',
    icon: Gamepad2,
    category: ToolCategory.HEALTH,
    component: ReactionTime
  },
  {
    id: 'typing',
    name: 'Typing Test',
    description: 'Test your WPM speed and accuracy.',
    icon: Zap,
    category: ToolCategory.HEALTH,
    component: TypingTest
  },
  {
    id: 'emoji',
    name: 'Emoji Picker',
    description: 'Find and copy popular emojis.',
    icon: Smile,
    category: ToolCategory.HEALTH,
    component: EmojiPickerTool
  },
  {
    id: 'randomizer',
    name: 'List Randomizer',
    description: 'Shuffle or sort lists of items.',
    icon: Shuffle,
    category: ToolCategory.HEALTH,
    component: ListRandomizer
  },
  {
    id: 'signature',
    name: 'Signature Pad',
    description: 'Draw and download digital signatures.',
    icon: PenTool,
    category: ToolCategory.HEALTH,
    component: SignaturePad
  },

  // --- Developer & Text ---
  {
    id: 'jwt',
    name: 'JWT Decoder',
    description: 'Decode JSON Web Tokens.',
    icon: Unlock,
    category: ToolCategory.DEV,
    component: JwtDecoder
  },
  {
    id: 'password',
    name: 'Password Generator',
    description: 'Create strong, secure random passwords.',
    icon: Lock,
    category: ToolCategory.DEV,
    component: PasswordGenerator
  },
  {
    id: 'uuid',
    name: 'UUID Generator',
    description: 'Generate unique v4 identifiers.',
    icon: Fingerprint,
    category: ToolCategory.DEV,
    component: UuidGenerator
  },
  {
    id: 'text',
    name: 'Text Analyzer',
    description: 'Count words, chars, and reading time.',
    icon: Type,
    category: ToolCategory.DEV,
    component: TextAnalyzer
  },
  {
    id: 'diff',
    name: 'Diff Viewer',
    description: 'Compare two text blocks for changes.',
    icon: FileDiff,
    category: ToolCategory.DEV,
    component: DiffViewer
  },
  {
    id: 'case',
    name: 'Case Converter',
    description: 'camelCase, snake_case, PascalCase, etc.',
    icon: ALargeSmall,
    category: ToolCategory.DEV,
    component: CaseConverter
  },
  {
    id: 'slug',
    name: 'Slug Generator',
    description: 'Make strings URL-friendly.',
    icon: Link2,
    category: ToolCategory.DEV,
    component: SlugGenerator
  },
  {
    id: 'qrcode',
    name: 'QR Code Generator',
    description: 'Create QR codes from text or URLs.',
    icon: QrCode,
    category: ToolCategory.DEV,
    component: QRCodeGenerator
  },
  {
    id: 'markdown',
    name: 'Markdown Preview',
    description: 'Write and preview markdown formatting.',
    icon: FileText,
    category: ToolCategory.DEV,
    component: MarkdownPreview
  },
  {
    id: 'json',
    name: 'JSON Formatter',
    description: 'Prettify and validate JSON strings.',
    icon: Code,
    category: ToolCategory.DEV,
    component: JsonFormatter
  },
  {
    id: 'html-entity',
    name: 'HTML Entities',
    description: 'Escape/Unescape HTML characters.',
    icon: FileCode,
    category: ToolCategory.DEV,
    component: HtmlEntityEncoder
  },
  {
    id: 'base64',
    name: 'Base64 Converter',
    description: 'Encode and decode Base64 strings.',
    icon: BoxSelect,
    category: ToolCategory.DEV,
    component: Base64Converter
  },
  {
    id: 'url',
    name: 'URL Encoder',
    description: 'Encode/Decode URL components.',
    icon: Link,
    category: ToolCategory.DEV,
    component: UrlEncoder
  },
  {
    id: 'unix',
    name: 'Unix Timestamp',
    description: 'Convert epoch time to human dates.',
    icon: CalendarClock,
    category: ToolCategory.DEV,
    component: UnixConverter
  },
  {
    id: 'keycode',
    name: 'Keycode Info',
    description: 'Visualize Javascript keyboard events.',
    icon: Keyboard,
    category: ToolCategory.DEV,
    component: KeycodeInfo
  },
  {
    id: 'meta',
    name: 'Meta Tag Gen',
    description: 'Generate SEO HTML meta tags.',
    icon: Tag,
    category: ToolCategory.DEV,
    component: MetaTagGenerator
  },
  {
    id: 'hash',
    name: 'Hash Generator',
    description: 'Generate SHA-256 hashes from text.',
    icon: Shield,
    category: ToolCategory.DEV,
    component: HashGenerator
  },
  {
    id: 'lorem',
    name: 'Lorem Ipsum',
    description: 'Generate placeholder text.',
    icon: AlignJustify,
    category: ToolCategory.DEV,
    component: LoremIpsumGenerator
  },
];