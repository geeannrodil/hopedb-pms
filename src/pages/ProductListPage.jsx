import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Plus, Edit, Trash2, PackageSearch } from 'lucide-react';
import { UserRightsProvider } from '../context/UserRightsContext'; // ← FIX 1: missing import

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userType, rights } = useRights(); // ← FIX 2: was missing useRights import above

  useEffect(() => {
    fetchProducts();
  }, [userType]); // ← FIX 3: re-fetch when userType resolves (was [])

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('product')
        .select('prodcode, description, unit, record_status, stamp')
        .order('prodcode');

      // Sprint 2 Rule: Kapag ordinaryong USER, "ACTIVE" products lang ang pwedeng makita
      if (userType === 'USER') { // ← FIX 4: was "currentUserType" (undefined variable)
        query = query.eq('record_status', 'ACTIVE');
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-2 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Inventory
        </h1>
        {/* Only show Add button if user has PRD_ADD right */}
        {rights.PRD_ADD === 1 && ( // ← FIX 5: was always visible, now gated by right
          <button className="flex items-center gap-2 bg-[#1E3A5F] hover:bg-[#27496D] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm">
            <Plus size={18} />
            Add Product
          </button>
        )}
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-slate-500">
            <Loader2 size={32} className="animate-spin mb-4 text-[#1E3A5F]" />
            <p>Loading inventory...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-slate-500">
            <PackageSearch size={48} className="mb-4 text-slate-300" />
            <p>No products found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-200 text-sm font-semibold text-slate-600">
                  <th className="px-6 py-4">Code</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Unit</th>
                  <th className="px-6 py-4">Status</th>
                  {/* Sprint 2 Rule: ADMIN at SUPERADMIN lang ang makakakita ng Stamp */}
                  {(userType === 'SUPERADMIN' || userType === 'ADMIN') && ( // ← FIX 6: was "currentUserType"
                    <th className="px-6 py-4">Stamp (Audit)</th>
                  )}
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((item) => (
                  <tr key={item.prodcode} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{item.prodcode}</td>
                    <td className="px-6 py-4 text-slate-700">{item.description}</td>
                    <td className="px-6 py-4 text-slate-500 uppercase">{item.unit}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        item.record_status === 'ACTIVE'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}>
                        {item.record_status}
                      </span>
                    </td>
                    {(userType === 'SUPERADMIN' || userType === 'ADMIN') && ( // ← FIX 7: was "currentUserType"
                      <td className="px-6 py-4 text-xs text-slate-400 font-mono">
                        {item.stamp}
                      </td>
                    )}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        {rights.PRD_EDIT === 1 && ( // ← FIX 8: gate Edit button by right
                          <button className="text-slate-400 hover:text-[#1E3A5F] transition-colors" title="Edit">
                            <Edit size={18} />
                          </button>
                        )}
                        {rights.PRD_DEL === 1 && ( // ← FIX 9: gate Delete button by right
                          <button className="text-slate-400 hover:text-rose-500 transition-colors" title="Deactivate">
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}