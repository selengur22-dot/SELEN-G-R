import React, { useState, useRef } from 'react';
import { 
  X, 
  Save, 
  Plus, 
  RotateCcw, 
  Check, 
  Percent, 
  Copy, 
  DollarSign, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Sparkles,
  Sliders,
  Upload,
  Trash2,
  Edit2,
  Settings,
  Image as ImageIcon
} from 'lucide-react';
import { Product, ProductCategory, SiteSettings } from '../types';
import { CATEGORIES } from '../data/initialProducts';
import { formatPrice } from '../utils/formatters';

interface PriceManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateAllProducts: (updatedProducts: Product[]) => void;
  onResetToDefaults: () => void;
  siteSettings: SiteSettings;
  onUpdateSiteSettings: (newSettings: SiteSettings) => void;
}

export const PriceManagerModal: React.FC<PriceManagerModalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateAllProducts,
  onResetToDefaults,
  siteSettings,
  onUpdateSiteSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'bulk' | 'settings' | 'export'>(
    products.length === 0 ? 'add' : 'list'
  );
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Working copy of products and settings for editing
  const [editableProducts, setEditableProducts] = useState<Product[]>(products);
  const [editableSettings, setEditableSettings] = useState<SiteSettings>(siteSettings);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  // File upload input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editImageInputRef = useRef<HTMLInputElement>(null);
  const [editingProductForImageId, setEditingProductForImageId] = useState<string | null>(null);

  // Sync when props change or modal opens
  React.useEffect(() => {
    setEditableProducts(products);
    setEditableSettings(siteSettings);
    if (products.length === 0) {
      setActiveTab('add');
    }
  }, [products, siteSettings, isOpen]);

  // New Knit Bag Form State (Clean slate without any AI presets)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'omuz-cantasi',
    categoryLabel: 'Örgü Omuz Çantası',
    price: 0,
    originalPrice: undefined,
    image: '',
    description: '',
    fabricDetails: '%100 Pamuk Makrome İpi · Kumaş Astarlı',
    sizes: ['Standart'],
    colors: ['Krem'],
    dimensions: '',
    handleType: 'Örgü Askı',
    stockStatus: 'in_stock',
    hidePrice: false,
    isNew: true,
  });

  // Bulk Adjustment State
  const [bulkPercentage, setBulkPercentage] = useState<number>(10);
  const [bulkCategory, setBulkCategory] = useState<string>('all');
  const [bulkType, setBulkType] = useState<'increase' | 'decrease'>('increase');

  if (!isOpen) return null;

  // Handle Image Upload from device (Phone or Computer)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Fotoğraf boyutu 5 MB\'tan küçük olmalıdır.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        setNewProduct((prev) => ({ ...prev, image: base64Url }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Change image of an existing product in the catalog from phone/pc
  const handleExistingProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProductForImageId) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        setEditableProducts((prev) =>
          prev.map((item) => (item.id === editingProductForImageId ? { ...item, image: base64Url } : item))
        );
        setEditingProductForImageId(null);
        setSaveSuccessNotice('Çanta fotoğrafı güncellendi! Kaydet butonuna basmayı unutmayın.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePriceChange = (id: string, newPriceVal: number) => {
    setEditableProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price: Math.max(0, newPriceVal) } : item))
    );
  };

  const handleNameChange = (id: string, newName: string) => {
    setEditableProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name: newName } : item))
    );
  };

  const handleOriginalPriceChange = (id: string, val: number | undefined) => {
    setEditableProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, originalPrice: val } : item))
    );
  };

  const handleToggleHidePrice = (id: string) => {
    setEditableProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, hidePrice: !item.hidePrice } : item))
    );
  };

  const handleStockChange = (id: string, status: 'in_stock' | 'limited' | 'preorder') => {
    setEditableProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stockStatus: status } : item))
    );
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`"${name}" çanta modelini silmek istediğinize emin misiniz?`)) {
      const filtered = editableProducts.filter((p) => p.id !== id);
      setEditableProducts(filtered);
      onUpdateAllProducts(filtered);
      setSaveSuccessNotice(`"${name}" başarıyla silindi.`);
      setTimeout(() => setSaveSuccessNotice(null), 3000);
    }
  };

  const handleSaveAll = () => {
    onUpdateAllProducts(editableProducts);
    onUpdateSiteSettings(editableSettings);
    setSaveSuccessNotice('Tüm fiyatlar, çantalar ve site ayarları başarıyla kaydedildi!');
    setTimeout(() => setSaveSuccessNotice(null), 3000);
  };

  const handleAddNewProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert('Lütfen çanta model adını ve fiyat bilgisini giriniz.');
      return;
    }

    const catObj = CATEGORIES.find((c) => c.id === newProduct.category);
    const itemToAdd: Product = {
      id: `guase-bag-${Date.now()}`,
      code: `GSE-BAG-${Math.floor(100 + Math.random() * 900)}`,
      name: newProduct.name || 'Yeni Örgü Çanta',
      category: (newProduct.category as ProductCategory) || 'omuz-cantasi',
      categoryLabel: catObj?.label || 'Örme Çanta',
      price: Number(newProduct.price),
      originalPrice: newProduct.originalPrice ? Number(newProduct.originalPrice) : undefined,
      image: newProduct.image || '/src/assets/images/knit_chunky_bag_1790581296036.jpg',
      description: newProduct.description || '%100 el emeği el örgüsü çanta.',
      fabricDetails: newProduct.fabricDetails || '%100 Pamuk Makrome İpi',
      sizes: newProduct.sizes || ['Standart'],
      colors: newProduct.colors && newProduct.colors.length > 0 ? newProduct.colors : ['Krem', 'Bej'],
      dimensions: newProduct.dimensions || '25 x 18 x 7 cm',
      handleType: newProduct.handleType || 'Örgü Askı',
      stockStatus: (newProduct.stockStatus as any) || 'in_stock',
      hidePrice: Boolean(newProduct.hidePrice),
      isNew: true,
    };

    const updated = [itemToAdd, ...editableProducts];
    setEditableProducts(updated);
    onUpdateAllProducts(updated);
    setActiveTab('list');
    setSaveSuccessNotice(`"${itemToAdd.name}" modeli ve fiyatı başarıyla eklendi!`);
    setTimeout(() => setSaveSuccessNotice(null), 3000);
  };

  const handleApplyBulkPrice = () => {
    const factor = bulkType === 'increase' ? (1 + bulkPercentage / 100) : (1 - bulkPercentage / 100);
    const updated = editableProducts.map((p) => {
      if (bulkCategory === 'all' || p.category === bulkCategory) {
        const calculated = Math.round((p.price * factor) / 25) * 25;
        return {
          ...p,
          originalPrice: bulkType === 'decrease' ? p.price : p.originalPrice,
          price: calculated,
        };
      }
      return p;
    });

    setEditableProducts(updated);
    onUpdateAllProducts(updated);
    setSaveSuccessNotice(
      `${bulkCategory === 'all' ? 'Tüm' : bulkCategory} modellere %${bulkPercentage} ${
        bulkType === 'increase' ? 'fiyat artışı' : 'indirim'
      } uygulandı ve kaydedildi!`
    );
    setTimeout(() => setSaveSuccessNotice(null), 3500);
  };

  const getExportSummaryText = () => {
    const lines = [
      '🧶 GUASÉ ISTANBUL · GÜNCEL EL ÖRGÜSÜ ÇANTA FİYAT LİSTESİ 🧶',
      `Instagram: @${editableSettings.instagramHandle}\n`,
      '📦 Yalnızca Online Satış | Tüm Türkiye’ye Kargo\n',
    ];
    editableProducts.forEach((p) => {
      const priceText = p.hidePrice ? 'Fiyat Sorunuz (DM)' : formatPrice(p.price);
      lines.push(`• ${p.name} [${p.code}]: ${priceText}`);
      if (p.fabricDetails) lines.push(`  İp Türü: ${p.fabricDetails}`);
    });
    lines.push('\n📩 Sipariş & Özel Renk İstekleriniz için Instagram DM veya WhatsApp üzerinden iletişime geçebilirsiniz.');
    return lines.join('\n');
  };

  const handleCopyPriceList = () => {
    navigator.clipboard.writeText(getExportSummaryText());
    setSaveSuccessNotice('Örgü çanta fiyat listesi panoya kopyalandı! (Instagram DM veya WhatsApp için hazır)');
    setTimeout(() => setSaveSuccessNotice(null), 3000);
  };

  // Filtered list
  const filteredProducts = editableProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          p.code.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          p.fabricDetails.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Hidden file input for changing existing product photos */}
      <input
        type="file"
        ref={editImageInputRef}
        onChange={handleExistingProductImageUpload}
        accept="image/*"
        className="hidden"
      />

      <div 
        className="bg-[#FAF9F6] w-full max-w-5xl rounded-lg shadow-2xl border border-[#D5CEC2] flex flex-col max-h-[92vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#231F1C] text-[#FAF9F6] flex items-center justify-between border-b border-[#3B3530]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded text-[#D4AF37]">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-semibold tracking-wide flex items-center gap-2">
                Guasé Istanbul · Düzenleme & Yönetim Alanı
              </h2>
              <p className="text-[11px] text-[#A69C93]">
                Fiyatları, fotoğrafları, ürünleri, telefon numaranızı ve Instagram bilgilerinizi buradan istediğiniz gibi değiştirebilirsiniz.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#A69C93] hover:text-white rounded hover:bg-white/10 transition-colors"
            title="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert Banner */}
        {saveSuccessNotice && (
          <div className="bg-[#1B4D2E] text-[#E8F5E9] px-6 py-2.5 text-xs font-medium flex items-center justify-between animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#81C784]" />
              <span>{saveSuccessNotice}</span>
            </div>
            <button onClick={() => setSaveSuccessNotice(null)} className="text-white/80 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-[#EDE8DF] border-b border-[#DCD5C9] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'list'
                  ? 'bg-white text-[#1A1A1A] shadow-xs border border-[#C5BEB1]'
                  : 'text-[#5C554E] hover:text-[#1A1A1A]'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Fiyat & Ürünler ({editableProducts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('add')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'add'
                  ? 'bg-white text-[#1A1A1A] shadow-xs border border-[#C5BEB1]'
                  : 'text-[#5C554E] hover:text-[#1A1A1A]'
              }`}
            >
              <Plus className="w-3.5 h-3.5 text-[#2E7D32]" />
              <span>Yeni Çanta Ekle</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'settings'
                  ? 'bg-white text-[#1A1A1A] shadow-xs border border-[#C5BEB1]'
                  : 'text-[#5C554E] hover:text-[#1A1A1A]'
              }`}
            >
              <Settings className="w-3.5 h-3.5 text-[#3A6B9B]" />
              <span>Site Metinleri & İletişim</span>
            </button>

            <button
              onClick={() => setActiveTab('bulk')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'bulk'
                  ? 'bg-white text-[#1A1A1A] shadow-xs border border-[#C5BEB1]'
                  : 'text-[#5C554E] hover:text-[#1A1A1A]'
              }`}
            >
              <Percent className="w-3.5 h-3.5 text-[#C27D00]" />
              <span>Toplu Fiyat</span>
            </button>

            <button
              onClick={() => setActiveTab('export')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'export'
                  ? 'bg-white text-[#1A1A1A] shadow-xs border border-[#C5BEB1]'
                  : 'text-[#5C554E] hover:text-[#1A1A1A]'
              }`}
            >
              <Copy className="w-3.5 h-3.5 text-[#6B5A4E]" />
              <span>Fiyat Listesini Kopyala</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAll}
              className="px-4 py-1.5 bg-[#1F1C1A] hover:bg-[#3D3732] text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Kaydet & Uygula</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Price List & Spreadsheet Edit */}
        {activeTab === 'list' && (
          <div className="flex-1 overflow-y-auto p-6">
            
            {/* Search and Category Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Çanta adı, kod veya ip türü..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full sm:w-64 px-3 py-1.5 text-xs bg-white border border-[#D5CEC2] rounded text-[#1A1A1A] focus:outline-none focus:border-[#B8860B]"
                />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white border border-[#D5CEC2] rounded text-[#1A1A1A] focus:outline-none focus:border-[#B8860B]"
                >
                  <option value="all">Tüm Kategoriler</option>
                  {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-xs text-[#7A7269] flex items-center gap-3">
                <span>{filteredProducts.length} çanta listeleniyor</span>
                <button
                  onClick={() => {
                    if (confirm('Örme çanta kataloğunu ilk varsayılan haline sıfırlamak istiyor musunuz?')) {
                      onResetToDefaults();
                      setSaveSuccessNotice('Örme çanta kataloğu varsayılana döndürüldü.');
                    }
                  }}
                  className="text-[#9E5D4E] hover:text-[#7A3628] flex items-center gap-1 text-[11px]"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Varsayılana Sıfırla</span>
                </button>
              </div>
            </div>

            {/* Price Table with Inline Edit & Photo Change */}
            <div className="border border-[#DCD5C9] rounded-md overflow-hidden bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#2E2824]">
                  <thead className="bg-[#F3EFE8] border-b border-[#DCD5C9] text-[11px] uppercase tracking-wider text-[#6B635A]">
                    <tr>
                      <th className="py-2.5 px-3">Görsel (Tıkla Değiştir)</th>
                      <th className="py-2.5 px-3">Çanta Modeli</th>
                      <th className="py-2.5 px-3">Kategori</th>
                      <th className="py-2.5 px-3 font-semibold text-[#1A1A1A]">
                        Fiyat (₺)
                      </th>
                      <th className="py-2.5 px-3">Eski Fiyat</th>
                      <th className="py-2.5 px-3 text-center">Fiyat Görünümü</th>
                      <th className="py-2.5 px-3">Stok Durumu</th>
                      <th className="py-2.5 px-3 text-center">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFECE6]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors">
                        
                        {/* Image (Click to change from device) */}
                        <td className="py-3 px-3">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProductForImageId(p.id);
                              editImageInputRef.current?.click();
                            }}
                            className="relative group block w-12 h-12 rounded bg-[#EDE8DF] overflow-hidden border border-[#D5CEC2]"
                            title="Kendi telefonunuzdan/bilgisayarınızdan fotoğraf yüklemek için tıklayın"
                          >
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-cover group-hover:opacity-60 transition-opacity"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 text-white">
                              <Upload className="w-3.5 h-3.5" />
                            </div>
                          </button>
                        </td>

                        {/* Name (Directly Editable) */}
                        <td className="py-3 px-3">
                          <input
                            type="text"
                            value={p.name}
                            onChange={(e) => handleNameChange(p.id, e.target.value)}
                            className="w-full px-2 py-1 bg-transparent hover:bg-white focus:bg-white border border-transparent hover:border-[#D5CEC2] focus:border-[#B8860B] rounded text-xs font-semibold text-[#1A1A1A]"
                            title="Model adını değiştirmek için buraya yazabilirsiniz"
                          />
                          <div className="text-[10px] text-[#8C827A] px-2 font-mono">{p.code}</div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-3">
                          <div className="font-medium text-[#4A443E]">{p.categoryLabel}</div>
                        </td>

                        {/* Current Price Input */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-[#7A6A58]">₺</span>
                            <input
                              type="number"
                              min="0"
                              step="25"
                              value={p.price}
                              onChange={(e) => handlePriceChange(p.id, parseFloat(e.target.value) || 0)}
                              className="w-20 sm:w-24 px-2 py-1 bg-[#FFF] border border-[#C5BEB1] rounded text-sm font-bold text-[#1A1A1A] tabular-nums focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                            />
                          </div>
                        </td>

                        {/* Original / List Price Input */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1">
                            <span className="text-[#A39B91]">₺</span>
                            <input
                              type="number"
                              min="0"
                              placeholder="İsteğe bağlı"
                              value={p.originalPrice || ''}
                              onChange={(e) => {
                                const val = e.target.value === '' ? undefined : parseFloat(e.target.value);
                                handleOriginalPriceChange(p.id, val);
                              }}
                              className="w-18 sm:w-20 px-2 py-1 bg-[#FFF] border border-[#DDD7CD] rounded text-xs text-[#5C554E] tabular-nums focus:outline-none"
                            />
                          </div>
                        </td>

                        {/* Toggle Price Display */}
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => handleToggleHidePrice(p.id)}
                            className={`px-2 py-1 text-[11px] font-medium rounded transition-colors inline-flex items-center gap-1 ${
                              p.hidePrice
                                ? 'bg-[#F2E8E8] text-[#8B2626] border border-[#E0BCBC]'
                                : 'bg-[#EBF3EB] text-[#246124] border border-[#C2E0C2]'
                            }`}
                            title={p.hidePrice ? "Fiyat sitede 'Fiyat Sorunuz' olarak gözükür" : "Fiyat sitede açıkça görünür"}
                          >
                            {p.hidePrice ? (
                              <>
                                <EyeOff className="w-3 h-3" />
                                <span>Fiyat Sorunuz</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-3 h-3" />
                                <span>Görünür</span>
                              </>
                            )}
                          </button>
                        </td>

                        {/* Stock Status Selector */}
                        <td className="py-3 px-3">
                          <select
                            value={p.stockStatus}
                            onChange={(e) => handleStockChange(p.id, e.target.value as any)}
                            className="px-2 py-1 bg-white border border-[#DDD7CD] rounded text-[11px] text-[#4A443E] focus:outline-none"
                          >
                            <option value="in_stock">Hemen Teslim</option>
                            <option value="limited">Sınırlı Adet</option>
                            <option value="preorder">Siparişe Göre Örülür</option>
                          </select>
                        </td>

                        {/* Delete Button */}
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="p-1.5 text-[#B87D7D] hover:text-[#9E2A2B] hover:bg-[#FBEBEB] rounded transition-colors"
                            title="Bu Çantayı Listeden Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Helper Note */}
            <div className="mt-4 p-3 bg-[#F4F1EA] rounded border border-[#E2DDCF] text-xs text-[#6B635A] flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
              <span>
                <strong>Nasıl Oynama Yapabilirsiniz?</strong> Tablodaki çanta adlarını, fiyatlarını ve stok durumlarını doğrudan kutulara tıklayarak değiştirebilirsiniz. Ayrıca çanta fotoğrafına tıklayarak telefonunuzdan/bilgisayarınızdan kendi çektiğiniz fotoğrafı yükleyebilirsiniz. İşiniz bitince sağ üstteki <strong>"Kaydet & Uygula"</strong> butonuna basmanız yeterlidir.
              </span>
            </div>

          </div>
        )}

        {/* Tab 2: Add New Knit Bag Form (With Photo Upload) */}
        {activeTab === 'add' && (
          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={handleAddNewProductSubmit} className="max-w-2xl mx-auto space-y-4">
              
              <div className="border-b border-[#E2DDCF] pb-3 mb-4">
                <h3 className="font-serif text-lg font-semibold text-[#1A1A1A]">
                  Yeni Çanta ve Fiyat Girişi
                </h3>
                <p className="text-xs text-[#6B635A]">
                  Instagram'da paylaştığınız yeni bir çanta modelinin fotoğrafını yükleyip fiyatıyla birlikte siteye ekleyin.
                </p>
              </div>

              {/* Photo Upload from device */}
              <div className="p-4 bg-white border border-[#D5CEC2] rounded-md">
                <label className="block text-xs font-semibold text-[#2E2824] mb-2">
                  Çanta Fotoğrafı (Telefonunuzdan veya Bilgisayarınızdan Yükleyin)
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded bg-[#F2EDE4] border border-[#D5CEC2] overflow-hidden shrink-0 flex items-center justify-center">
                    {newProduct.image ? (
                      <img src={newProduct.image} alt="Önizleme" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-[#A1988E]" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-1.5 bg-[#2E2824] hover:bg-black text-white text-xs font-medium rounded flex items-center gap-1.5 shadow-2xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Kendi Fotoğrafımı Yükle</span>
                    </button>
                    <p className="text-[11px] text-[#7A7269]">
                      Instagram'da paylaştığınız fotoğrafı cihazınızdan seçebilirsiniz (JPG/PNG).
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                    Çanta Model Adı *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Haki Çizgili Mini Örgü Omuz Çantası"
                    value={newProduct.name || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5CEC2] rounded focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                    Çanta Kategorisi *
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => {
                      const cat = CATEGORIES.find((c) => c.id === e.target.value);
                      setNewProduct({
                        ...newProduct,
                        category: e.target.value as ProductCategory,
                        categoryLabel: cat?.label || 'Örme Çanta',
                      });
                    }}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5CEC2] rounded focus:outline-none focus:border-[#B8860B]"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                    Satış Fiyatı (TL) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-bold text-[#7A6A58]">₺</span>
                    <input
                      type="number"
                      required
                      min="0"
                      placeholder="1450"
                      value={newProduct.price || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-7 pr-3 py-2 text-xs bg-white border border-[#D5CEC2] rounded font-bold tabular-nums focus:outline-none focus:border-[#B8860B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                    Eski Fiyat (İndirim Göstermek İçin - İsteğe Bağlı)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs text-[#9E978D]">₺</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="1750"
                      value={newProduct.originalPrice || ''}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          originalPrice: e.target.value ? parseFloat(e.target.value) : undefined,
                        })
                      }
                      className="w-full pl-7 pr-3 py-2 text-xs bg-white border border-[#D5CEC2] rounded tabular-nums focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                    İplik ve Malzeme Türü
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: %100 Pamuk Makrome İpi · Kumaş Astarlı"
                    value={newProduct.fabricDetails || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, fabricDetails: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5CEC2] rounded focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                    Ebat / Boyut
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: 28 x 20 x 8 cm"
                    value={newProduct.dimensions || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, dimensions: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5CEC2] rounded focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-4 py-2 border border-[#D5CEC2] text-[#4A443E] hover:bg-[#EFECE6] text-xs font-medium rounded"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1F1C1A] hover:bg-[#38332F] text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Çanta Modelini ve Fiyatını Kaydet</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* Tab 3: Site Texts & Settings Edit */}
        {activeTab === 'settings' && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto space-y-5 bg-white p-6 rounded-md border border-[#D5CEC2] shadow-xs">
              <div className="border-b border-[#E8E2D5] pb-3">
                <h3 className="font-serif text-lg font-semibold text-[#1A1A1A]">
                  Site Metinleri & İletişim Bilgileri
                </h3>
                <p className="text-xs text-[#6B635A]">
                  WhatsApp sipariş numaranızı, Instagram adresinizi, duyuru şeridinizi ve açılış cümlelerini buradan dilediğiniz gibi güncelleyebilirsiniz.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                    WhatsApp Sipariş Telefon Numarası
                  </label>
                  <input
                    type="text"
                    placeholder="905321234567"
                    value={editableSettings.whatsappPhone}
                    onChange={(e) => setEditableSettings({ ...editableSettings, whatsappPhone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#D5CEC2] rounded focus:outline-none focus:border-[#B8860B] font-mono"
                  />
                  <span className="text-[10px] text-[#7A7269]">Ülke koduyla birlikte bitişik yazın (Örn: 905321234567)</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                    Instagram Kullanıcı Adı
                  </label>
                  <div className="flex items-center">
                    <span className="px-2.5 py-2 text-xs bg-[#F0EBE1] border border-r-0 border-[#D5CEC2] rounded-l text-[#7A7269]">@</span>
                    <input
                      type="text"
                      placeholder="guaseistanbul"
                      value={editableSettings.instagramHandle}
                      onChange={(e) => setEditableSettings({ ...editableSettings, instagramHandle: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#D5CEC2] rounded-r focus:outline-none focus:border-[#B8860B]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                  En Üst Duyuru Şeridi Metni
                </label>
                <input
                  type="text"
                  value={editableSettings.topAnnouncement}
                  onChange={(e) => setEditableSettings({ ...editableSettings, topAnnouncement: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#D5CEC2] rounded focus:outline-none focus:border-[#B8860B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                    Ana Sayfa Büyük Başlık
                  </label>
                  <input
                    type="text"
                    value={editableSettings.heroTitle}
                    onChange={(e) => setEditableSettings({ ...editableSettings, heroTitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#D5CEC2] rounded focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                    Ana Sayfa Alt Vurgu Cümlesi
                  </label>
                  <input
                    type="text"
                    value={editableSettings.heroSubtitle}
                    onChange={(e) => setEditableSettings({ ...editableSettings, heroSubtitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#D5CEC2] rounded focus:outline-none focus:border-[#B8860B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                  Online Satış & Teslimat Notu
                </label>
                <input
                  type="text"
                  value={editableSettings.onlineSalesNote}
                  onChange={(e) => setEditableSettings({ ...editableSettings, onlineSalesNote: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#D5CEC2] rounded focus:outline-none focus:border-[#B8860B]"
                />
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveAll}
                  className="px-5 py-2.5 bg-[#1F1C1A] hover:bg-[#38332F] text-white text-xs font-semibold rounded flex items-center gap-2 shadow-xs"
                >
                  <Save className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Bilgileri Kaydet & Yayına Al</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Tab 4: Bulk Price Adjuster */}
        {activeTab === 'bulk' && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-md border border-[#D5CEC2] shadow-xs">
              <h3 className="font-serif text-lg font-semibold text-[#1A1A1A] mb-1">
                Toplu Fiyat Güncelleme
              </h3>
              <p className="text-xs text-[#6B635A] mb-5">
                Tüm çantalara veya seçtiğiniz örgü kategorisine tek seferde yüzde oranı uygulayın.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                    İşlem Türü
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setBulkType('increase')}
                      className={`py-2 px-3 text-xs font-semibold rounded border transition-colors ${
                        bulkType === 'increase'
                          ? 'bg-[#1F1C1A] text-white border-[#1F1C1A]'
                          : 'bg-[#F9F7F4] text-[#5C554E] border-[#D5CEC2]'
                      }`}
                    >
                      + Fiyat Artışı
                    </button>
                    <button
                      type="button"
                      onClick={() => setBulkType('decrease')}
                      className={`py-2 px-3 text-xs font-semibold rounded border transition-colors ${
                        bulkType === 'decrease'
                          ? 'bg-[#1F1C1A] text-white border-[#1F1C1A]'
                          : 'bg-[#F9F7F4] text-[#5C554E] border-[#D5CEC2]'
                      }`}
                    >
                      - İndirim Uygula
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                      Oran (%)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={bulkPercentage}
                        onChange={(e) => setBulkPercentage(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#D5CEC2] rounded font-bold"
                      />
                      <span className="text-xs text-[#7A7269] font-bold">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2E2824] mb-1">
                      Hedef Çanta Kategorisi
                    </label>
                    <select
                      value={bulkCategory}
                      onChange={(e) => setBulkCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D5CEC2] rounded"
                    >
                      <option value="all">Tüm Örgü Çantalar ({editableProducts.length})</option>
                      {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleApplyBulkPrice}
                  className="w-full py-2.5 bg-[#1F1C1A] hover:bg-[#3D3732] text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Percent className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Toplu Fiyat Güncellemesini Uygula & Kaydet</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Export to Instagram / WhatsApp */}
        {activeTab === 'export' && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#1A1A1A]">
                    Instagram & WhatsApp İçin Hazır Fiyat Metni
                  </h3>
                  <p className="text-xs text-[#6B635A]">
                    Müşterilerinize doğrudan DM veya WhatsApp mesajı olarak göndermek için tek tıkla kopyalayın.
                  </p>
                </div>
                <button
                  onClick={handleCopyPriceList}
                  className="px-4 py-2 bg-[#2E2824] hover:bg-black text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Panoya Kopyala</span>
                </button>
              </div>

              <textarea
                readOnly
                rows={12}
                value={getExportSummaryText()}
                className="w-full p-4 font-mono text-xs bg-[#FAF9F6] border border-[#D5CEC2] rounded leading-relaxed text-[#2A2421] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#FAF8F5] border-t border-[#DCD5C9] flex items-center justify-between text-xs text-[#7A7269]">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Yaptığınız tüm değişiklikler tarayıcınıza anında ve kalıcı kaydedilir.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#E8E4DC] hover:bg-[#DDD8CE] text-[#2E2824] text-xs font-semibold rounded transition-colors"
          >
            Pencereyi Kapat
          </button>
        </div>

      </div>
    </div>
  );
};
