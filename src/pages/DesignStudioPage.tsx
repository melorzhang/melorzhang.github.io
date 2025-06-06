import { Card, Button, Space, message } from 'antd';
import { useRef, useState } from 'react';

const DesignStudioPage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [drawing, setDrawing] = useState(false);

    // 简单画图逻辑
    const handleMouseDown = (e: React.MouseEvent) => {
        setDrawing(true);
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            }
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!drawing) return;
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                ctx.stroke();
            }
        }
    };

    const handleMouseUp = () => {
        setDrawing(false);
    };

    const handleClear = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

    // 导出图片
    const handleExport = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = url;
            a.download = 'design.png';
            a.click();
        }
    };

    // 导入图片
    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (evt) {
            const img = new window.Image();
            img.onload = function () {
                const canvas = canvasRef.current;
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        message.success('图片导入成功');
                    }
                }
            };
            if (evt.target?.result) {
                img.src = evt.target.result as string;
            }
        };
        reader.readAsDataURL(file);
        // 清空 value 以便连续导入同一文件
        e.target.value = '';
    };

    // 适配移动端画布宽度
    const getCanvasWidth = () => {
        if (typeof window !== 'undefined') {
            return Math.min(window.innerWidth - 32, 600); // 32为左右边距
        }
        return 600;
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-2">
            <Card title="室内设计画图制作室" className="shadow-lg rounded-xl">
                <canvas
                    ref={canvasRef}
                    width={getCanvasWidth()}
                    height={400}
                    style={{ border: '1px solid #ccc', background: '#fff', width: '100%', touchAction: 'none' }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    // 触摸事件支持移动端
                    onTouchStart={e => {
                        const touch = e.touches[0];
                        if (!touch) return;
                        setDrawing(true);
                        const canvas = canvasRef.current;
                        if (canvas) {
                            const rect = canvas.getBoundingClientRect();
                            const ctx = canvas.getContext('2d');
                            if (ctx) {
                                ctx.beginPath();
                                ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
                            }
                        }
                    }}
                    onTouchMove={e => {
                        if (!drawing) return;
                        const touch = e.touches[0];
                        if (!touch) return;
                        const canvas = canvasRef.current;
                        if (canvas) {
                            const rect = canvas.getBoundingClientRect();
                            const ctx = canvas.getContext('2d');
                            if (ctx) {
                                ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
                                ctx.stroke();
                            }
                        }
                    }}
                    onTouchEnd={() => setDrawing(false)}
                />
                <Space style={{ marginTop: 16 }} wrap>
                    <Button onClick={handleClear}>清空画布</Button>
                    <Button onClick={handleExport}>导出图片</Button>
                    <Button onClick={() => document.getElementById('import-img')?.click()}>导入图片</Button>
                    <input
                        id="import-img"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImport}
                    />
                </Space>
                <p style={{ marginTop: 16, color: '#888' }}>支持鼠标或手指绘制，支持导入/导出图片。</p>
            </Card>
        </div>
    );
};

export default DesignStudioPage;